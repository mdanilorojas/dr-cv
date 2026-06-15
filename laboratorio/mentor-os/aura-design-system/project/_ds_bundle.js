/* @ds-bundle: {"format":3,"namespace":"AuraDesignSystem_58f91b","components":[{"name":"Artifact","sourcePath":"components/artifact/Artifact.jsx"},{"name":"EmbedWell","sourcePath":"components/artifact/Artifact.jsx"},{"name":"DiffReview","sourcePath":"components/artifact/DiffReview.jsx"},{"name":"PlanSteps","sourcePath":"components/artifact/PlanSteps.jsx"},{"name":"SkillChip","sourcePath":"components/artifact/SkillChip.jsx"},{"name":"Stream","sourcePath":"components/artifact/Stream.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"AvatarGroup","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CardHeader","sourcePath":"components/core/Card.jsx"},{"name":"CardBody","sourcePath":"components/core/Card.jsx"},{"name":"Mastery","sourcePath":"components/core/Mastery.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"Skeleton","sourcePath":"components/feedback/Skeleton.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Segmented","sourcePath":"components/forms/Segmented.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/forms/Tabs.jsx"}],"sourceHashes":{"components/artifact/Artifact.jsx":"654d5660e7f6","components/artifact/DiffReview.jsx":"dda1acb2d333","components/artifact/PlanSteps.jsx":"ca7831494399","components/artifact/SkillChip.jsx":"449afecf7cf6","components/artifact/Stream.jsx":"cf20f159ba6e","components/core/Avatar.jsx":"b3523c85502f","components/core/Badge.jsx":"0d51e03d1e98","components/core/Button.jsx":"f7f39bda20a4","components/core/Card.jsx":"ffb70b28e8dd","components/core/Mastery.jsx":"a741df01751b","components/feedback/Alert.jsx":"51a747e7ac53","components/feedback/ProgressBar.jsx":"af9848f4a16c","components/feedback/Skeleton.jsx":"d2b69b887cf6","components/feedback/Toast.jsx":"00e469a503a6","components/feedback/Tooltip.jsx":"816dc623a842","components/forms/Input.jsx":"5e708602e73e","components/forms/Segmented.jsx":"c46ff324fa77","components/forms/Select.jsx":"12c88bc82808","components/forms/Switch.jsx":"f557ae883006","components/forms/Tabs.jsx":"4d5773d5c29a","ui_kits/app/AppShell.jsx":"667b3bdbe984","ui_kits/app/DashboardScreen.jsx":"1c4ba9ac78c8","ui_kits/app/DiagnosticScreen.jsx":"ebf2d7e0df15","ui_kits/app/SkillGraphScreen.jsx":"aeace71027c6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AuraDesignSystem_58f91b = window.AuraDesignSystem_58f91b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/artifact/Artifact.jsx
try { (() => {
/**
 * Artifact frame — the signature surface that wraps a running/produced AI artifact.
 * Header shows a live dot, file name, meta, and a status. Body holds the embed.
 */
function Artifact({
  file,
  meta,
  status = 'ready',
  className = '',
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ['artifact', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("div", {
    className: "artifact__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "artifact__dot",
    "aria-hidden": "true"
  }), file && /*#__PURE__*/React.createElement("span", {
    className: "artifact__file"
  }, file), meta && /*#__PURE__*/React.createElement("span", null, "\xB7 ", meta), status && /*#__PURE__*/React.createElement("span", {
    className: "artifact__status"
  }, status)), /*#__PURE__*/React.createElement("div", {
    className: "artifact__body"
  }, children));
}

/** PDF / file embed well shown inside an Artifact body. */
function EmbedWell({
  kind = 'PDF',
  title,
  meta
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "embed-well"
  }, /*#__PURE__*/React.createElement("div", {
    className: "embed-well__icon"
  }, kind), /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-primary)',
      fontWeight: 600,
      fontSize: 14
    }
  }, title), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 12,
      fontFamily: 'var(--font-mono)'
    }
  }, meta)));
}
Object.assign(__ds_scope, { Artifact, EmbedWell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/artifact/Artifact.jsx", error: String((e && e.message) || e) }); }

// components/artifact/DiffReview.jsx
try { (() => {
/** Diff-review block. `rows` = [{type:'add'|'del'|'ctx', text}]. */
function DiffReview({
  rows = [],
  className = ''
}) {
  const sign = t => t === 'add' ? '+' : t === 'del' ? '−' : ' ';
  return /*#__PURE__*/React.createElement("div", {
    className: ['diff', className].filter(Boolean).join(' ')
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: ['diff__row', r.type === 'add' ? 'diff__row--add' : r.type === 'del' ? 'diff__row--del' : ''].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("span", {
    className: "diff__sign"
  }, sign(r.type)), r.text)));
}
Object.assign(__ds_scope, { DiffReview });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/artifact/DiffReview.jsx", error: String((e && e.message) || e) }); }

// components/artifact/PlanSteps.jsx
try { (() => {
/** Plan-before-build checklist. `steps` = [{label, done}]. Uses the cool signal color. */
function PlanSteps({
  steps = [],
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ['plan', className].filter(Boolean).join(' ')
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: ['plan__step', s.done ? 'plan__step--done' : ''].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("span", {
    className: "plan__marker"
  }, s.done ? '✓' : i + 1), s.label)));
}
Object.assign(__ds_scope, { PlanSteps });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/artifact/PlanSteps.jsx", error: String((e && e.message) || e) }); }

// components/artifact/SkillChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Named-skill chip — accent chip with a mono uppercase label and ⌘ glyph. */
function SkillChip({
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['skill-chip', className].filter(Boolean).join(' ')
  }, rest), children);
}
Object.assign(__ds_scope, { SkillChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/artifact/SkillChip.jsx", error: String((e && e.message) || e) }); }

// components/artifact/Stream.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** "Visible thinking" stream with a blinking accent caret. */
function Stream({
  caret = true,
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['stream', className].filter(Boolean).join(' ')
  }, rest), children, caret && /*#__PURE__*/React.createElement("span", {
    className: "stream__caret",
    "aria-hidden": "true"
  }));
}
Object.assign(__ds_scope, { Stream });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/artifact/Stream.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Monogram or photo avatar. Defaults to the DR monogram styling. */
function Avatar({
  src,
  alt = '',
  initials = 'DR',
  size = 'base',
  className = '',
  ...rest
}) {
  const cls = ['avatar', size === 'lg' ? 'avatar--lg' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt
  }) : initials);
}
function AvatarGroup({
  className = '',
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ['avatar-group', className].filter(Boolean).join(' ')
  }, children);
}
Object.assign(__ds_scope, { Avatar, AvatarGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Small status pill. `mono` renders the JetBrains Mono uppercase variant. */
function Badge({
  variant = 'neutral',
  dot = false,
  mono = false,
  className = '',
  children,
  ...rest
}) {
  const cls = ['badge', variant && variant !== 'neutral' ? `badge--${variant}` : '', dot ? 'badge--dot' : '', mono ? 'badge--mono' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Aura primary action control. Thin wrapper over the .btn class system —
 * styling lives in components.css so it stays token-driven and theme-aware.
 */
function Button({
  variant = 'primary',
  size = 'base',
  iconOnly = false,
  block = false,
  className = '',
  children,
  ...rest
}) {
  const cls = ['btn', variant && variant !== 'secondary' ? `btn--${variant}` : 'btn--secondary', size !== 'base' ? `btn--${size}` : '', iconOnly ? 'btn--icon' : '', block ? 'btn--block' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Surface container with hairline border + soft shadow. Compose header/body or use `pad`. */
function Card({
  pad = false,
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['card', pad ? 'card--pad' : '', className].filter(Boolean).join(' ')
  }, rest), children);
}
function CardHeader({
  title,
  sub,
  trailing,
  className = '',
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ['card__header', className].filter(Boolean).join(' ')
  }, children ?? /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("div", {
    className: "card__title"
  }, title), sub && /*#__PURE__*/React.createElement("div", {
    className: "card__sub"
  }, sub)), trailing && /*#__PURE__*/React.createElement("div", {
    className: "card__trailing"
  }, trailing));
}
function CardBody({
  className = '',
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ['card__body', className].filter(Boolean).join(' ')
  }, children);
}
Object.assign(__ds_scope, { Card, CardHeader, CardBody });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Mastery.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Mastery badge — sacred semantics. Each level owns a fixed color pair; never reassign. */
function Mastery({
  level = 'novice',
  className = '',
  children,
  ...rest
}) {
  const label = children ?? level.charAt(0).toUpperCase() + level.slice(1);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['mastery', `mastery--${level}`, className].filter(Boolean).join(' ')
  }, rest), label);
}
Object.assign(__ds_scope, { Mastery });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Mastery.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Inline callout with a colored accent bar. */
function Alert({
  variant = 'info',
  title,
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['alert', `alert--${variant}`, className].filter(Boolean).join(' '),
    role: "status"
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "alert__bar",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("div", {
    className: "alert__title"
  }, title), children));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
/** Progress track. `value` 0–100. `tone` recolors the fill. */
function ProgressBar({
  value = 0,
  lg = false,
  tone = 'accent',
  className = ''
}) {
  const fillTone = tone === 'accent' ? '' : `progress__fill--${tone}`;
  return /*#__PURE__*/React.createElement("div", {
    className: ['progress', lg ? 'progress--lg' : '', className].filter(Boolean).join(' '),
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemin": 0,
    "aria-valuemax": 100
  }, /*#__PURE__*/React.createElement("div", {
    className: ['progress__fill', fillTone].filter(Boolean).join(' '),
    style: {
      width: `${Math.max(0, Math.min(100, value))}%`
    }
  }));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Skeleton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Shimmer placeholder. Size with width/height (or className). */
function Skeleton({
  width,
  height = 14,
  radius,
  className = '',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['skeleton', className].filter(Boolean).join(' '),
    style: {
      width,
      height,
      borderRadius: radius,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Transient notification surface. Pair with your own positioning / timeout. */
function Toast({
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['toast', className].filter(Boolean).join(' '),
    role: "status"
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "toast__dot",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Dark popover label. */
function Tooltip({
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['tooltip', className].filter(Boolean).join(' '),
    role: "tooltip"
  }, rest), children);
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Labeled text input with optional help text and focus ring. */
function Input({
  label,
  help,
  search = false,
  className = '',
  id,
  ...rest
}) {
  const field = search ? /*#__PURE__*/React.createElement("div", {
    className: "search"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "search__icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })), /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    className: ['input', className].filter(Boolean).join(' ')
  }, rest))) : /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    className: ['input', className].filter(Boolean).join(' ')
  }, rest));
  if (!label && !help) return field;
  return /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "field-label",
    htmlFor: id
  }, label), field, help && /*#__PURE__*/React.createElement("span", {
    className: "field-help"
  }, help));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Segmented.jsx
try { (() => {
/** Segmented control for 2–3 short, mutually-exclusive options. */
function Segmented({
  items = [],
  value,
  onChange,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ['segmented', className].filter(Boolean).join(' '),
    role: "group"
  }, items.map(it => {
    const id = typeof it === 'string' ? it : it.id;
    const label = typeof it === 'string' ? it : it.label;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      className: ['segmented__item', value === id ? 'segmented__item--active' : ''].filter(Boolean).join(' '),
      onClick: () => onChange && onChange(id)
    }, label);
  }));
}
Object.assign(__ds_scope, { Segmented });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Segmented.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Labeled native select with the Aura caret. */
function Select({
  label,
  help,
  className = '',
  id,
  children,
  ...rest
}) {
  const field = /*#__PURE__*/React.createElement("select", _extends({
    id: id,
    className: ['select', className].filter(Boolean).join(' ')
  }, rest), children);
  if (!label && !help) return field;
  return /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "field-label",
    htmlFor: id
  }, label), field, help && /*#__PURE__*/React.createElement("span", {
    className: "field-help"
  }, help));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Toggle switch. Controlled via `checked` + `onChange`, like a native checkbox. */
function Switch({
  checked,
  defaultChecked,
  onChange,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ['switch', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "switch__track"
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Tabs.jsx
try { (() => {
/** Underline tabs. `items` = [{id,label}]; controlled via `value` + `onChange(id)`. */
function Tabs({
  items = [],
  value,
  onChange,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ['tabs', className].filter(Boolean).join(' '),
    role: "tablist"
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    role: "tab",
    "aria-selected": value === it.id,
    className: ['tab', value === it.id ? 'tab--active' : ''].filter(Boolean).join(' '),
    onClick: () => onChange && onChange(it.id)
  }, it.label)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/AppShell.jsx
try { (() => {
// AppShell — sidebar + topbar chrome for the Career Training OS.
(function () {
  const {
    Avatar,
    Badge,
    Input
  } = window.AuraDesignSystem_58f91b;
  const ICONS = {
    dashboard: 'M3 12 12 3l9 9M5 10v10h14V10',
    diagnostic: 'M9 11l3 3 8-8M21 12a9 9 0 1 1-6-8.5',
    graph: 'M5 19V9M12 19V5M19 19v-7',
    journey: 'M5 12h14M13 6l6 6-6 6',
    mentor: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20a8 8 0 0 1 16 0',
    projects: 'M3 7h18v12H3zM3 7l2-3h6l2 3',
    settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.3 1a7 7 0 0 0-1.7-1L14.5 2h-5l-.4 2.4a7 7 0 0 0-1.7 1l-2.3-1-2 3.4L3 11a7 7 0 0 0 0 2l-2 1.6 2 3.4 2.3-1a7 7 0 0 0 1.7 1l.4 2.4h5l.4-2.4a7 7 0 0 0 1.7-1l2.3 1 2-3.4-2-1.6a7 7 0 0 0 .1-1z'
  };
  function Icon({
    d,
    size = 17
  }) {
    return /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: d
    }));
  }
  const NAV = [{
    group: 'Workspace',
    items: [{
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard'
    }, {
      id: 'diagnostic',
      label: 'Diagnostic',
      icon: 'diagnostic'
    }, {
      id: 'graph',
      label: 'Skill graph',
      icon: 'graph'
    }]
  }, {
    group: 'Program',
    items: [{
      id: 'journey',
      label: 'Learning path',
      icon: 'journey'
    }, {
      id: 'mentor',
      label: 'AI mentor',
      icon: 'mentor'
    }, {
      id: 'projects',
      label: 'Projects',
      icon: 'projects'
    }]
  }];
  function AppShell({
    active,
    onNavigate,
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "shell",
      style: {
        height: '100%'
      }
    }, /*#__PURE__*/React.createElement("aside", {
      className: "sidebar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sidebar__brand"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/dr-monogram.svg",
      width: "30",
      height: "30",
      alt: ""
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        letterSpacing: '-.02em',
        fontSize: 14,
        color: 'var(--text-primary)'
      }
    }, "Career OS"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        color: 'var(--text-faint)'
      }
    }, "danilorojas.design"))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: 'auto',
        paddingBottom: 16
      }
    }, NAV.map(g => /*#__PURE__*/React.createElement("div", {
      className: "sidebar__group",
      key: g.group
    }, /*#__PURE__*/React.createElement("div", {
      className: "sidebar__group-label"
    }, g.group), g.items.map(it => /*#__PURE__*/React.createElement("div", {
      key: it.id,
      className: 'nav-item' + (active === it.id ? ' nav-item--active' : ''),
      onClick: () => onNavigate(it.id)
    }, /*#__PURE__*/React.createElement(Icon, {
      d: ICONS[it.icon]
    }), " ", it.label))))), /*#__PURE__*/React.createElement("div", {
      className: "sidebar__group",
      style: {
        borderTop: '1px solid var(--border)',
        paddingTop: 12,
        paddingBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: 'nav-item' + (active === 'settings' ? ' nav-item--active' : ''),
      onClick: () => onNavigate('settings')
    }, /*#__PURE__*/React.createElement(Icon, {
      d: ICONS.settings
    }), " Settings"))), /*#__PURE__*/React.createElement("main", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        background: 'var(--bg)'
      }
    }, children));
  }
  function Topbar({
    title,
    onToggleTheme,
    theme
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "topbar"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 14,
        color: 'var(--text-primary)',
        letterSpacing: '-.01em'
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      className: "search",
      style: {
        width: 280,
        marginLeft: 12
      }
    }, /*#__PURE__*/React.createElement("svg", {
      className: "search__icon",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m21 21-4.3-4.3"
    })), /*#__PURE__*/React.createElement("input", {
      className: "input",
      placeholder: "Search \xB7 \u2318K"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      variant: "success",
      dot: true
    }, "on track"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn--ghost btn--icon",
      onClick: onToggleTheme,
      title: "Toggle theme"
    }, theme === 'dark' ? /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"
    })) : /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
    }))), /*#__PURE__*/React.createElement(Avatar, {
      src: "../../assets/photo/danilo.jpg",
      alt: "Danilo Rojas"
    })));
  }
  window.AppShell = AppShell;
  window.Topbar = Topbar;
  window.AppIcon = Icon;
  window.APP_ICONS = ICONS;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/DashboardScreen.jsx
try { (() => {
// Dashboard screen — the operative cockpit overview.
(function () {
  const {
    Card,
    CardHeader,
    CardBody,
    Badge,
    Mastery,
    ProgressBar,
    Artifact,
    EmbedWell,
    Stream,
    SkillChip
  } = window.AuraDesignSystem_58f91b;
  function Stat({
    label,
    value,
    delta,
    dir
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "card card--pad",
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "stat"
    }, /*#__PURE__*/React.createElement("div", {
      className: "stat__label"
    }, label), /*#__PURE__*/React.createElement("div", {
      className: "stat__value",
      style: {
        whiteSpace: 'nowrap',
        fontSize: 'var(--fs-2xl)'
      }
    }, value), delta && /*#__PURE__*/React.createElement("span", {
      className: 'delta delta--' + dir
    }, dir === 'up' ? '▲' : dir === 'down' ? '▼' : '—', " ", delta)));
  }
  function DashboardScreen() {
    return /*#__PURE__*/React.createElement("div", {
      className: "content",
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "page-header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow",
      style: {
        marginBottom: 8
      }
    }, "objective"), /*#__PURE__*/React.createElement("div", {
      className: "page-title"
    }, "Earn $250,000 / year as a Product Designer"), /*#__PURE__*/React.createElement("div", {
      className: "page-desc"
    }, "Banked value is climbing. Two clusters still gate the number.")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 'var(--s-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--s-5)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--s-4)'
      }
    }, /*#__PURE__*/React.createElement(Stat, {
      label: "Market value \xB7 banked",
      value: "$182,400",
      delta: "12% vs Q1",
      dir: "up"
    }), /*#__PURE__*/React.createElement(Stat, {
      label: "Gap to objective",
      value: "$67,600",
      delta: "closing",
      dir: "down"
    }), /*#__PURE__*/React.createElement(Stat, {
      label: "Mastered clusters",
      value: "9 / 14",
      delta: "+2",
      dir: "up"
    }), /*#__PURE__*/React.createElement(Stat, {
      label: "Diagnostic score",
      value: "78",
      delta: "senior rubric",
      dir: "flat"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.3fr 1fr',
        gap: 'var(--s-5)',
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Skill clusters",
      sub: "Graded from prose, ranked by market value",
      trailing: /*#__PURE__*/React.createElement(Badge, {
        mono: true
      }, "14 total")
    }), /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement("table", {
      className: "table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Cluster"), /*#__PURE__*/React.createElement("th", null, "Mastery"), /*#__PURE__*/React.createElement("th", {
      className: "num"
    }, "Banked"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Prototyping & craft"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Mastery, {
      level: "mastered"
    })), /*#__PURE__*/React.createElement("td", {
      className: "num"
    }, "$88,500")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Visual systems"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Mastery, {
      level: "mastered"
    })), /*#__PURE__*/React.createElement("td", {
      className: "num"
    }, "$51,900")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Systems thinking"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Mastery, {
      level: "developing"
    })), /*#__PURE__*/React.createElement("td", {
      className: "num"
    }, "$42,000")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Stakeholder craft"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Mastery, {
      level: "gap"
    })), /*#__PURE__*/React.createElement("td", {
      className: "num"
    }, "$0")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Research synthesis"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Mastery, {
      level: "proficient"
    })), /*#__PURE__*/React.createElement("td", {
      className: "num"
    }, "$31,200")))))), /*#__PURE__*/React.createElement(Artifact, {
      file: "learning-path.md",
      meta: "generated 14 Jun 2026",
      status: "ready"
    }, /*#__PURE__*/React.createElement(Stream, null, "Ranking gaps by market value \xB7 stakeholder-craft is the highest-leverage move"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14
      }
    }, /*#__PURE__*/React.createElement(EmbedWell, {
      kind: "MD",
      title: "Next learning path",
      meta: "6 steps \xB7 ~3 weeks"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        marginTop: 14,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(SkillChip, null, "prose-grader"), /*#__PURE__*/React.createElement(SkillChip, null, "market-value")))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Path to objective",
      sub: "Banked value across the program",
      trailing: /*#__PURE__*/React.createElement(Badge, {
        variant: "primary"
      }, "73% there")
    }), /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement(ProgressBar, {
      value: 73,
      lg: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 10,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--text-muted)'
      }
    }, /*#__PURE__*/React.createElement("span", null, "$0"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--accent)'
      }
    }, "$182,400 banked"), /*#__PURE__*/React.createElement("span", null, "$250,000"))))));
  }
  window.DashboardScreen = DashboardScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/DiagnosticScreen.jsx
try { (() => {
// Diagnostic screen — prose grader + visible thinking + plan-before-build.
(function () {
  const {
    Card,
    CardHeader,
    CardBody,
    Badge,
    Button,
    Mastery,
    Alert,
    PlanSteps,
    DiffReview,
    Stream,
    SkillChip,
    Artifact
  } = window.AuraDesignSystem_58f91b;
  function DiagnosticScreen() {
    return /*#__PURE__*/React.createElement("div", {
      className: "content",
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "page-header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow",
      style: {
        marginBottom: 8
      }
    }, "diagnostic"), /*#__PURE__*/React.createElement("div", {
      className: "page-title"
    }, "Prose grader \xB7 systems thinking"), /*#__PURE__*/React.createElement("div", {
      className: "page-desc"
    }, "Write, don't pick. Your prose is graded against the senior rubric.")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 'var(--s-6)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--s-5)',
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--s-5)'
      }
    }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Your response",
      trailing: /*#__PURE__*/React.createElement(Badge, {
        mono: true
      }, "318 words")
    }), /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement("div", {
      className: "field"
    }, /*#__PURE__*/React.createElement("textarea", {
      className: "textarea",
      style: {
        minHeight: 150
      },
      defaultValue: "When a flow breaks under load, I trace it to the system boundary — where ownership and data contracts blur. The fix is rarely the screen; it's the model behind it…"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--s-3)',
        marginTop: 'var(--s-4)'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary"
    }, "Grade response"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost"
    }, "Save draft")))), /*#__PURE__*/React.createElement(Alert, {
      variant: "info",
      title: "How grading works"
    }, "Each cluster is scored on evidence, tradeoffs and second-order thinking \u2014 never on keywords.")), /*#__PURE__*/React.createElement(Artifact, {
      file: "grade.run",
      meta: "streaming",
      status: "thinking"
    }, /*#__PURE__*/React.createElement(Stream, null, "Reading for system boundaries\u2026 found 2 strong tradeoffs, 1 missing second-order effect"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(PlanSteps, {
      steps: [{
        label: 'Parse response for evidence',
        done: true
      }, {
        label: 'Score against senior rubric',
        done: true
      }, {
        label: 'Locate the highest-leverage gap',
        done: false
      }]
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(DiffReview, {
      rows: [{
        type: 'add',
        text: 'mastery: developing → proficient'
      }, {
        type: 'add',
        text: 'banked_value += 18,000'
      }, {
        type: 'del',
        text: 'note: name the second-order effect'
      }]
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Mastery, {
      level: "proficient"
    }), /*#__PURE__*/React.createElement(SkillChip, null, "prose-grader")))));
  }
  window.DiagnosticScreen = DiagnosticScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/DiagnosticScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/SkillGraphScreen.jsx
try { (() => {
// Skill graph screen — mastery map across clusters with a donut + bars.
(function () {
  const {
    Card,
    CardHeader,
    CardBody,
    Badge,
    Mastery,
    Tabs,
    Segmented
  } = window.AuraDesignSystem_58f91b;
  function Donut({
    segments
  }) {
    const total = segments.reduce((s, x) => s + x.v, 0);
    let acc = 0;
    const R = 52,
      C = 2 * Math.PI * R;
    return /*#__PURE__*/React.createElement("svg", {
      width: "140",
      height: "140",
      viewBox: "0 0 140 140"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "70",
      cy: "70",
      r: R,
      fill: "none",
      stroke: "var(--surface-hover)",
      strokeWidth: "16"
    }), segments.map((s, i) => {
      const len = s.v / total * C;
      const el = /*#__PURE__*/React.createElement("circle", {
        key: i,
        cx: "70",
        cy: "70",
        r: R,
        fill: "none",
        stroke: s.color,
        strokeWidth: "16",
        strokeDasharray: `${len} ${C - len}`,
        strokeDashoffset: -acc,
        transform: "rotate(-90 70 70)",
        strokeLinecap: "butt"
      });
      acc += len;
      return el;
    }), /*#__PURE__*/React.createElement("text", {
      x: "70",
      y: "66",
      textAnchor: "middle",
      fontFamily: "var(--font-mono)",
      fontSize: "22",
      fontWeight: "600",
      fill: "var(--text-primary)"
    }, "64%"), /*#__PURE__*/React.createElement("text", {
      x: "70",
      y: "84",
      textAnchor: "middle",
      fontFamily: "var(--font-mono)",
      fontSize: "9",
      letterSpacing: "1",
      fill: "var(--text-muted)"
    }, "MASTERED"));
  }
  function Bar({
    label,
    level,
    pct,
    color
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--s-4)',
        padding: '8px 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 150,
        fontSize: 'var(--fs-base)',
        color: 'var(--text-secondary)'
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 8,
        background: 'var(--surface-hover)',
        borderRadius: 'var(--r-full)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: pct + '%',
        height: '100%',
        background: color,
        borderRadius: 'inherit'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 96,
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement(Mastery, {
      level: level
    })));
  }
  function SkillGraphScreen() {
    const [tab, setTab] = React.useState('all');
    return /*#__PURE__*/React.createElement("div", {
      className: "content",
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "page-header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow",
      style: {
        marginBottom: 8
      }
    }, "skill graph"), /*#__PURE__*/React.createElement("div", {
      className: "page-title"
    }, "Mastery map"), /*#__PURE__*/React.createElement("div", {
      className: "page-desc"
    }, "Fourteen clusters, one number. Color is the sacred mastery scale.")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 'var(--s-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--s-5)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: setTab,
      items: [{
        id: 'all',
        label: 'All clusters'
      }, {
        id: 'gaps',
        label: 'Gaps'
      }, {
        id: 'mastered',
        label: 'Mastered'
      }]
    }), /*#__PURE__*/React.createElement(Segmented, {
      items: ['Map', 'List'],
      value: "List",
      onChange: () => {}
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        gap: 'var(--s-5)',
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Distribution"
    }), /*#__PURE__*/React.createElement(CardBody, {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--s-4)'
      }
    }, /*#__PURE__*/React.createElement(Donut, {
      segments: [{
        v: 9,
        color: 'var(--m-mastered)'
      }, {
        v: 2,
        color: 'var(--m-proficient)'
      }, {
        v: 2,
        color: 'var(--m-developing)'
      }, {
        v: 1,
        color: 'var(--m-gap)'
      }]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Mastery, {
      level: "mastered"
    }, "9"), /*#__PURE__*/React.createElement(Mastery, {
      level: "proficient"
    }, "2"), /*#__PURE__*/React.createElement(Mastery, {
      level: "developing"
    }, "2"), /*#__PURE__*/React.createElement(Mastery, {
      level: "gap"
    }, "1")))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
      title: "Clusters by market value",
      trailing: /*#__PURE__*/React.createElement(Badge, {
        mono: true
      }, "USD weighted")
    }), /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement(Bar, {
      label: "Prototyping & craft",
      level: "mastered",
      pct: 96,
      color: "var(--m-mastered)"
    }), /*#__PURE__*/React.createElement(Bar, {
      label: "Visual systems",
      level: "mastered",
      pct: 88,
      color: "var(--m-mastered)"
    }), /*#__PURE__*/React.createElement(Bar, {
      label: "Research synthesis",
      level: "proficient",
      pct: 64,
      color: "var(--m-proficient)"
    }), /*#__PURE__*/React.createElement(Bar, {
      label: "Systems thinking",
      level: "developing",
      pct: 48,
      color: "var(--m-developing)"
    }), /*#__PURE__*/React.createElement(Bar, {
      label: "Facilitation",
      level: "developing",
      pct: 40,
      color: "var(--m-developing)"
    }), /*#__PURE__*/React.createElement(Bar, {
      label: "Stakeholder craft",
      level: "gap",
      pct: 12,
      color: "var(--m-gap)"
    }))))));
  }
  window.SkillGraphScreen = SkillGraphScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/SkillGraphScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Artifact = __ds_scope.Artifact;

__ds_ns.EmbedWell = __ds_scope.EmbedWell;

__ds_ns.DiffReview = __ds_scope.DiffReview;

__ds_ns.PlanSteps = __ds_scope.PlanSteps;

__ds_ns.SkillChip = __ds_scope.SkillChip;

__ds_ns.Stream = __ds_scope.Stream;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarGroup = __ds_scope.AvatarGroup;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardBody = __ds_scope.CardBody;

__ds_ns.Mastery = __ds_scope.Mastery;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Segmented = __ds_scope.Segmented;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
