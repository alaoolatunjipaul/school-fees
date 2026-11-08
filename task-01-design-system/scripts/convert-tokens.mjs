import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const inputPath = path.join(root, 'evidence', '06-tokens-complete.json');
const outputPath = path.join(root, 'tokens.css');

const BASE_FONT_PX = 16;
const ALPHA_DECIMALS = 3;
const NUM_DECIMALS = 5;

const data = JSON.parse(readFileSync(inputPath, 'utf8'));

const issues = [];
const assumptions = [
  `Font sizes are converted to rem assuming a ${BASE_FONT_PX}px root font size.`,
  'Line-height is converted to a unitless ratio (lineHeight / fontSize).',
  'Letter-spacing is converted to em (letterSpacing / fontSize).',
  '8-digit hex colours are converted to rgba(); 6-digit hex colours are left unchanged.',
  `rgba() alpha is rounded to ${ALPHA_DECIMALS} decimal places.`,
  `Converted decimal values are rounded to ${NUM_DECIMALS} decimal places.`,
  'The "ref" collection is emitted as --ref-* and marked internal.',
  'The typography fields fontStyle, paragraphSpacing, paragraphIndent, textDecoration and textCase are omitted by request.',
  'Font-family values containing spaces are wrapped in double quotes for CSS.'
];
const omittedNonDefault = [];

function slug(value) {
  return String(value)
    .toLowerCase()
    .replace(/%/g, 'pct')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function aliasToVar(value) {
  const match = /^\{(.+)\}$/.exec(String(value).trim());
  if (!match) return null;
  return `var(--${match[1].split('.').map(slug).join('-')})`;
}

function colorToCss(value) {
  const hex = String(value).trim();
  const body = hex.replace(/^#/, '');
  if (/^[0-9a-fA-F]{6}$/.test(body)) return hex;
  if (/^[0-9a-fA-F]{8}$/.test(body)) {
    const r = parseInt(body.slice(0, 2), 16);
    const g = parseInt(body.slice(2, 4), 16);
    const b = parseInt(body.slice(4, 6), 16);
    const a = Number((parseInt(body.slice(6, 8), 16) / 255).toFixed(ALPHA_DECIMALS));
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return null;
}

function num(value) {
  const rounded = Number(Number(value).toFixed(NUM_DECIMALS));
  return String(Object.is(rounded, -0) ? 0 : rounded);
}

function lengthToCss(length) {
  if (!length || typeof length.value !== 'number' || typeof length.unit !== 'string') return null;
  return `${num(length.value)}${length.unit}`;
}

function fontFamilyToCss(value) {
  if (typeof value !== 'string' || value.trim() === '') return null;
  if (/^["'].*["']$/.test(value)) return value;
  return /\s/.test(value) ? JSON.stringify(value) : value;
}

function flatten(node, parts = [], out = []) {
  if (node === null || typeof node !== 'object' || Array.isArray(node)) return out;
  if (typeof node.$type === 'string' && Object.prototype.hasOwnProperty.call(node, '$value')) {
    out.push({ parts, token: node });
    return out;
  }
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    flatten(value, [...parts, key], out);
  }
  return out;
}

const tokens = flatten(data);
const sections = { ref: [], color: [], typography: [], shadow: [] };
const seen = new Set();

function addTo(section, name, value) {
  if (seen.has(name)) {
    issues.push(`Duplicate property ${name}; kept the first value and skipped the later one.`);
    return;
  }
  seen.add(name);
  sections[section].push(`  ${name}: ${value};`);
}

for (const { parts, token } of tokens) {
  if (parts[0] !== 'ref') continue;
  const name = `--${parts.map(slug).join('-')}`;
  if (token.$type !== 'color') {
    issues.push(`${parts.join('.')} is not a colour (found "${token.$type}").`);
    continue;
  }
  const css = colorToCss(token.$value);
  if (css === null) {
    issues.push(`${parts.join('.')} has an unsupported colour value "${token.$value}".`);
    continue;
  }
  addTo('ref', name, css);
}

for (const { parts, token } of tokens) {
  if (parts[0] !== 'material-theme') continue;
  const name = `--color-${slug(parts[parts.length - 1])}`;
  if (token.$type !== 'color') {
    issues.push(`${parts.join('.')} is not a colour (found "${token.$type}").`);
    continue;
  }
  const alias = aliasToVar(token.$value);
  const css = alias ?? colorToCss(token.$value);
  if (css === null) {
    issues.push(`${parts.join('.')} has an unsupported colour value "${token.$value}".`);
    continue;
  }
  addTo('color', name, css);
}

for (const { parts, token } of tokens) {
  if (parts[0] !== 'Typography-styles') continue;
  if (token.$type !== 'typography') {
    issues.push(`${parts.join('.')} is not typography (found "${token.$type}").`);
    continue;
  }

  const value = token.$value;
  const style = parts.slice(2).map(slug).join('-');
  const base = `--text-${style}`;

  const family = fontFamilyToCss(value.fontFamily);
  if (family === null) {
    issues.push(`${parts.join('.')} has no usable fontFamily.`);
  } else {
    addTo('typography', `${base}-font-family`, family);
  }

  if (typeof value.fontWeight === 'number' || typeof value.fontWeight === 'string') {
    addTo('typography', `${base}-font-weight`, String(value.fontWeight));
  } else {
    issues.push(`${parts.join('.')} has no usable fontWeight.`);
  }

  const fontSize = value.fontSize;
  const lineHeight = value.lineHeight;
  const letterSpacing = value.letterSpacing;

  if (!fontSize || typeof fontSize.value !== 'number' || fontSize.unit !== 'px') {
    issues.push(`${parts.join('.')} has no usable px fontSize, so font-size, line-height and letter-spacing were skipped.`);
  } else {
    const fontSizePx = fontSize.value;
    addTo('typography', `${base}-font-size`, `${num(fontSizePx / BASE_FONT_PX)}rem`);

    if (!lineHeight || typeof lineHeight.value !== 'number' || lineHeight.unit !== 'px') {
      issues.push(`${parts.join('.')} has no usable px lineHeight.`);
    } else {
      addTo('typography', `${base}-line-height`, num(lineHeight.value / fontSizePx));
    }

    if (!letterSpacing || typeof letterSpacing.value !== 'number' || letterSpacing.unit !== 'px') {
      issues.push(`${parts.join('.')} has no usable px letterSpacing.`);
    } else {
      addTo('typography', `${base}-letter-spacing`, `${num(letterSpacing.value / fontSizePx)}em`);
    }
  }

  if (value.fontStyle !== undefined && value.fontStyle !== 'normal') {
    omittedNonDefault.push(`${parts.join('.')}: fontStyle = "${value.fontStyle}"`);
  }
  if (value.textDecoration !== undefined && value.textDecoration !== 'NONE') {
    omittedNonDefault.push(`${parts.join('.')}: textDecoration = "${value.textDecoration}"`);
  }
  if (value.textCase !== undefined && value.textCase !== 'ORIGINAL') {
    omittedNonDefault.push(`${parts.join('.')}: textCase = "${value.textCase}"`);
  }
  for (const field of ['paragraphSpacing', 'paragraphIndent']) {
    if (value[field] !== undefined && !(value[field] && value[field].value === 0)) {
      omittedNonDefault.push(`${parts.join('.')}: ${field} = ${JSON.stringify(value[field])}`);
    }
  }
}

for (const { parts, token } of tokens) {
  if (parts[0] !== 'Effect-styles') continue;
  if (token.$type !== 'shadow') {
    issues.push(`${parts.join('.')} is not a shadow (found "${token.$type}").`);
    continue;
  }

  const level = slug(parts[parts.length - 1]);
  const shadows = Array.isArray(token.$value) ? token.$value : [token.$value];
  const converted = shadows.map((shadow) => {
    const color = colorToCss(shadow.color);
    const x = lengthToCss(shadow.offsetX);
    const y = lengthToCss(shadow.offsetY);
    const blur = lengthToCss(shadow.blur);
    const spread = lengthToCss(shadow.spread);
    if (color === null || x === null || y === null || blur === null || spread === null) return null;
    const inset = shadow.inset ? 'inset ' : '';
    return `${inset}${x} ${y} ${blur} ${spread} ${color}`;
  });

  if (converted.some((item) => item === null)) {
    issues.push(`${parts.join('.')} has a shadow layer that could not be converted.`);
    continue;
  }
  addTo('shadow', `--shadow-${level}`, converted.join(', '));
}

const lines = [];
lines.push('/* Generated by scripts/convert-tokens.mjs from evidence/06-tokens-complete.json. Do not edit by hand. */');
lines.push('/* 8-digit hex colours are emitted as rgba() for compatibility with older Android browsers. */');
lines.push('');
lines.push(':root {');

if (sections.ref.length > 0) {
  lines.push('  /* Internal primitives (collection "ref"). Not for direct use on the interface. */');
  lines.push(...sections.ref);
  lines.push('');
}

if (sections.color.length > 0) {
  lines.push('  /* Colour roles for interface use. Aliases reference --ref-* primitives. */');
  lines.push(...sections.color);
  lines.push('');
}

if (sections.typography.length > 0) {
  lines.push('  /* Typography: font sizes use rem (16px base assumed). Line-height is a unitless ratio (line-height / font-size) and letter-spacing uses em (letter-spacing / font-size) so both scale with the font size. */');
  lines.push(...sections.typography);
  lines.push('');
}

if (sections.shadow.length > 0) {
  lines.push('  /* Shadows combined from offsetX, offsetY, blur, spread and colour. */');
  lines.push(...sections.shadow);
}

if (lines[lines.length - 1] === '') lines.pop();
lines.push('}');
lines.push('');

writeFileSync(outputPath, lines.join('\n'), 'utf8');

console.log(`Wrote ${seen.size} custom properties to ${path.relative(root, outputPath)}.`);
console.log('');
console.log('Could not be converted:');
if (issues.length === 0) {
  console.log('  (none)');
} else {
  for (const issue of issues) console.log(`  - ${issue}`);
}
console.log('');
console.log('Non-default values in omitted typography fields:');
if (omittedNonDefault.length === 0) {
  console.log('  (none; all omitted fields were at their defaults)');
} else {
  for (const item of omittedNonDefault) console.log(`  - ${item}`);
}
console.log('');
console.log('Assumptions:');
for (const assumption of assumptions) console.log(`  - ${assumption}`);
