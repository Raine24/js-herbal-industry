# Design System & UI Implementation Guidance: Tibico Fermentary → JS Herbal Industry Storefront

**Design Intent:** Deliver a minimal, utility-first, accessibility-prioritized e-commerce storefront architecture modeled on Tibico Fermentary (`tibicohealth.com`) and tailored for **JS Herbal Industry** (*"Qudrat Ka Bharosa, Mayaar Ka Wada!"*) using strict semantic tokens, deterministic component states, and WCAG 2.2 AA compliance.

---

## 1. Context and Goals

- **Brand & Surface:** Tibico Fermentary Craft Fermented Water Kefirs (`https://www.tibicohealth.com/`) architecture adapted for **JS Herbal Industry** (Herbal, Skincare & Wellness Products e-commerce storefront and WhatsApp ordering experience).
- **Audience:** Online shoppers and retail/wholesale consumers seeking botanical, hygienic, scientifically formulated herbal, skincare, and wellness products.
- **Architectural Goals:**
  - Every UI component **must** consume semantic design tokens rather than hardcoded stylesheet values.
  - Interactive surfaces **must** support keyboard-first navigation, visible focus rings, pointer hover feedback, and touch-friendly target sizing.
  - Page composition **must** support the storefront's benchmark component density without layout shift or frame drops: **links (106), buttons (67), cards (45), lists (17), inputs (9), navigation (3)**.
  - Teams **should** prefer system consistency over local visual exceptions across all promotional, catalog, educational, and checkout/WhatsApp ordering flows.

---

## 2. Design Tokens and Foundations

All raw values are encapsulated at the root token layer (`styles.css`). Component rules **must** reference semantic token names only.

### 2.1 Typography Tokens

| Semantic Token | Value / Mapping | Role & Usage Rule |
| :--- | :--- | :--- |
| `font.family.primary` | `neulis-neue` | Primary brand typeface for headings, buttons, badges, and body copy. |
| `font.family.stack` | `neulis-neue, Jost, sans-serif` | Resilient font stack; all text nodes **must** inherit from this stack. |
| `font.size.base` | `16.2px` | Default storefront body copy size. |
| `font.weight.base` | `400` | Default body copy weight; bold emphasis **must** use `600`–`900`. |
| `font.lineHeight.base` | `30.6px` | Base paragraph line-height for optimal Roman Urdu and English readability. |
| `font.size.xs` | `11.34px` | Micro badges, legal footnotes, and compact metadata labels. |
| `font.size.sm` | `11.7px` | Secondary pills, input helper labels, and stock badges. |
| `font.size.md` | `12px` | Announcement bars, utility links, and eyebrow tags. |
| `font.size.lg` | `12.96px` | Compact card descriptions and footer metadata. |
| `font.size.xl` | `13.33px` | Standard button labels, navigation links, and form inputs. |
| `font.size.2xl` | `14px` | Emphasized navigation links, card subheadings, and table cells. |
| `font.size.3xl` | `14.4px` | Lead body text, feature summaries, and accordion triggers. |
| `font.size.4xl` | `14.58px` | Prominent callout copy and hero subtitle text. |

### 2.2 Color Tokens

| Semantic Token | Raw Value (Root Only) | Semantic Purpose |
| :--- | :--- | :--- |
| `color.text.primary` | `#1d1d1d` | Primary foreground ink for body text, headings, and high-contrast icons. |
| `color.text.tertiary` | `#ffffff` | Inverse foreground text used on dark surfaces (`color.surface.base`) and primary CTA buttons. |
| `color.surface.base` | `#000000` | High-contrast inverse surface for top utility banners, footer, and primary solid buttons. |
| `color.surface.raised` | `#f2f2f2` | Elevated neutral section and card-grid container background. |
| `color.surface.card` | `color.text.tertiary` | Inner card container surface for product tiles and modal drawers. |
| `color.surface.accent.lime` | Botanical Lime surface | Used for marquee strips, hero slide 2, and botanical category pills. |
| `color.surface.accent.lavender` | Soft Lavender surface | Used for hero slide 1, core values grid, and FAQ summary bars. |
| `color.surface.accent.amber` | Warm Herbal Amber surface | Used for hero slide 3 and wellness spotlight callouts. |
| `color.state.focus` | Botanical Purple glow | Focus-visible ring and active input aura paired with `shadow.2`. |
| `color.state.error` | High-contrast crimson | Validation error border, icon, and assertive status text. |

### 2.3 Spacing Scale Tokens

Components **must** construct internal micro-padding, gaps, and border offsets from the core spacing scale (or exact multiples thereof):
- `space.1 = 1px` (hairline borders and dividers)
- `space.2 = 3.6px` (micro badge vertical offset)
- `space.3 = 4px` (tight icon-to-label inline spacing)
- `space.4 = 4.5px` (compact tag padding)
- `space.5 = 5px` (pill inner spacing and indicator gaps)
- `space.6 = 6px` (standard control gap and list item spacing)
- `space.7 = 6.3px` (button vertical micro-rhythm)
- `space.8 = 6.75px` (card metadata stack gap)

### 2.4 Radius, Elevation, and Motion Tokens

- **Radius Scale:**
  - `radius.xs = 3px` (inline code/micro indicators)
  - `radius.sm = 4px` (checkboxes and subtle tags)
  - `radius.md = 15px` (inner product card frames and FAQ accordion rows)
  - `radius.lg = 18px` (spotlight callout cards and form panels)
  - `radius.xl = 20px` (outer product cards `.tbc-bs__card`, split-section media frames)
  - `radius.2xl = 50px` (large pill containers and floating action bars)
  - `radius.step7 = 999px` (full-pill CTA buttons, filter chips, and status badges)
- **Shadow Scale:**
  - `shadow.1 = rgb(0, 0, 0) 0px 4px 14px -10px` (subtle resting elevation for raised cards)
  - `shadow.2 = rgba(140, 80, 165, 0.55) 0px 0px 15.9961px 3.99902px` (focus-visible halo and active spotlight ring)
  - `shadow.3 = rgba(0, 0, 0, 0.18) 0px 2px 10px 0px` (hover card elevation, sticky header, and floating drawers)
- **Motion Duration Scale:**
  - `motion.duration.instant = 100ms` (active press scale feedback)
  - `motion.duration.fast = 150ms` (icon transforms and underline reveals)
  - `motion.duration.normal = 200ms` (button color/shadow transitions and tooltip fades)
  - `motion.duration.slow = 300ms` (drawer slide-ins, modal overlays, and card hover lift)
  - `motion.duration.slower = 400ms` (accordion expand/collapse and tab switches)
  - `motion.duration.step6 = 700ms` (hero slider crossfades, SVG hand-drawn underline strokes, and AOS scroll reveals)

---

## 3. Component-Level Rules

Storefront pages **must** engineer component families to scale cleanly at the target page density: **links (106), buttons (67), cards (45), lists (17), inputs (9), navigation (3)**.

### 3.1 Navigation (`navigation: 3` — Primary Sticky Header, Mobile Drawer Nav, Footer Sitemap Nav)
- **Anatomy:** Landmark `<nav>` with explicit `aria-label`, brand logo link, horizontal or stacked `<ul>` link list (`font.size.xl`), and utility action cluster (Search, WhatsApp CTA, Order Drawer trigger).
- **Variants:**
  1. *Primary Sticky Header:* Transparent-to-surface sticky bar with animated bottom link underline.
  2. *Mobile Off-Canvas Drawer:* Full-height slide-over panel triggered below `990px`.
  3. *Footer Multi-Column Nav:* Inverse surface (`color.surface.base`) with `color.text.tertiary` links.
- **State Matrix:**
  - `default`: Text in `color.text.primary` (header) or `color.text.tertiary` (footer); underline scale `0`.
  - `hover`: Underline scales to `100%` over `motion.duration.normal`; opacity remains `1`.
  - `focus-visible`: `2px` solid outline in `color.text.primary` (or `color.text.tertiary` on dark surfaces) plus `shadow.2` halo.
  - `active`: Current route indicated via `aria-current="page"` and persistent `space.1` bottom bar.
  - `disabled`: `aria-disabled="true"`, `opacity: 0.45`, `pointer-events: none`.
  - `loading`: Skeleton shimmer placeholder of height `font.size.2xl` while menu items resolve.
  - `error`: Fallback inline link to `#hamari-products` and `#contact-us` if dynamic menu config fails.
- **Keyboard, Pointer & Touch:** `Tab` traverses links sequentially; `Escape` **must** close the mobile drawer and return focus to the menu toggle button; touch targets **must** be at least `44px × 44px`.
- **Responsive & Edge Cases:** Above `8` top-level items, links **should** wrap cleanly or collapse into the mobile drawer at `990px` without horizontal overflow.

### 3.2 Links (`links: 106` — In-Text Anchors, Category Pills, WhatsApp/Tel/Mailto Triggers, Footer Links)
- **Anatomy:** Semantic `<a href="...">` with descriptive label text (`font.size.xl` or inherited body scale) and optional trailing arrow icon spaced by `space.6`.
- **Variants:** Inline editorial link, `.button-arrow` directional link, pill anchor chip (`radius.step7`), and contact protocol link (`tel:`, `mailto:`, `https://wa.me/`).
- **State Matrix:**
  - `default`: `color.text.primary` with animated pseudo-underline or pill container.
  - `hover`: Animated underline expands left-to-right in `motion.duration.normal`; `.button-arrow` translates icon `+4px` on X-axis.
  - `focus-visible`: High-contrast ring with `shadow.2` and `radius.sm` offset.
  - `active`: Scale `0.98` over `motion.duration.instant`.
  - `disabled`: `aria-disabled="true"`, `tabindex="-1"`, muted opacity `0.45`.
  - `loading`: Cursor `progress` with inline spinner replacing trailing arrow icon.
  - `error`: Broken external protocol fallback copies contact number/email to clipboard and announces via `aria-live="polite"`.
- **Keyboard, Pointer & Touch:** Activated via `Enter` key; pointer hover triggers underline; touch tap triggers immediate navigation without sticky hover artifacts.
- **Overflow & Long Content:** Long URLs or Roman Urdu anchor labels **must** wrap using `overflow-wrap: anywhere` and never clip horizontally.

### 3.3 Buttons (`buttons: 67` — Hero CTAs, Add-to-Order Triggers, Slider Controls, Accordion Headers, Drawer Actions)
- **Anatomy:** Semantic `<button type="button|submit">` with `radius.step7` (full pill), `font.family.primary`, `font.size.xl`, `font.weight: 700`, horizontal padding `calc(space.6 * 4)`, and optional leading/trailing SVG icon (`space.6` gap).
- **Variants:** Primary Solid (`color.surface.base` fill, `color.text.tertiary` label), Secondary Outline (`space.1` border in `color.text.primary`), Botanical Accent (lime/lavender fill with `color.text.primary` label), and Icon-Only Control (`44px × 44px` circular `radius.step7`).
- **State Matrix:**
  - `default`: Resting surface fill, `shadow.1`, transform `translateY(0)`.
  - `hover`: Elevates by `-2px` with `shadow.3` over `motion.duration.normal`.
  - `focus-visible`: `shadow.2` outer ring plus `2px` solid contrasting outline.
  - `active`: Depresses to `translateY(0) scale(0.98)` in `motion.duration.instant`.
  - `disabled`: `disabled` attribute, `opacity: 0.45`, `cursor: not-allowed`, no hover lift.
  - `loading`: `aria-busy="true"`, label replaced or paired with dual-ring CSS spinner, pointer clicks locked to prevent double submission.
  - `error`: Border and surface shift to `color.state.error` with shake micro-animation (`motion.duration.fast`) and assertive status message.
- **Keyboard, Pointer & Touch:** Activated via `Enter` or `Space`; minimum `44px × 44px` hit target on touch viewports.
- **Long Content Handling:** Labels exceeding one line **must** wrap with `text-align: center` and maintain minimum vertical padding of `space.8`.

### 3.4 Cards (`cards: 45` — `.tbc-bs` Product Cards, Spotlight Feature Cards, Core Value Tiles, Gallery & Testimonial Cards)
- **Anatomy:** Outer container (`radius.xl`, `color.surface.raised` or botanical tint), inner frame (`radius.md`, `color.surface.card`), media container (`aspect-ratio: 1 / 1` or `4 / 3` with `radius.md`), category badge (`radius.step7`, `font.size.xs`), title (`font.family.primary`), bullet feature list, and action footer.
- **Variants:** `.tbc-bs.is-soft` 4-column product card, `.spotlight` feature card, `.tibico-core-values` icon card, and `.custom-image-with-text` 55%/45% split card.
- **State Matrix:**
  - `default`: Resting surface with `shadow.1` and smooth transition `motion.duration.slow`.
  - `hover`: Card lifts `-4px` with `shadow.3`; product image scales to `1.04` over `motion.duration.slow`.
  - `focus-visible`: When card or primary action receives keyboard focus, displays `shadow.2` around the focus target.
  - `active`: Subtle press feedback `scale(0.99)` when interactive card surface is clicked.
  - `disabled`: Out-of-stock / unavailable state applies `opacity: 0.6`, grayscale filter `60%`, and disables primary CTA button.
  - `loading`: Media and text slots render animated pulse placeholders (`color.surface.raised`) matching final aspect ratios to prevent CLS.
  - `error`: If product media fails to load, displays branded botanical SVG fallback emblem instead of a broken image icon.
- **Responsive & Empty/Overflow Rules:** Grid shifts from 4 columns (`>1100px`) → 2 columns (`640px–1100px`) → 1 column (`<640px`). Titles clamp at 2 lines (`-webkit-line-clamp: 2`) with full text preserved in `title` attribute; empty product filter states **must** display a clear reset CTA.

### 3.5 Lists (`lists: 17` — Product Benefit Bullets, Quality Checklists, WhatsApp Order Steps, FAQ Lists, Footer Links)
- **Anatomy:** Semantic `<ul>` or `<ol>` with `space.6` vertical item rhythm, custom botanical check/dot marker, and `font.size.base` / `font.lineHeight.base` typography.
- **Variants:** Checkmark feature list (`.custom-image-with-text__list`), numbered process list (WhatsApp 4-step ordering guide), marquee horizontal list (`.scroll-text`), and interactive order drawer item list.
- **State Matrix:**
  - `default`: Clean vertical stack with `color.text.primary`.
  - `hover`: Interactive list rows highlight background to `color.surface.raised` in `motion.duration.fast`.
  - `focus-visible`: Interactive list controls display `shadow.2` focus ring.
  - `active`: Selected filter or order item displays bold weight (`700`) and accent border.
  - `disabled`: Muted item with `opacity: 0.5`.
  - `loading`: 3-row shimmer placeholder bars.
  - `error`: Inline alert banner inside list container with retry button.
- **Empty State Handling:** When the WhatsApp Order Drawer list has `0` items, it **must** render an explicit empty state message (*"Aapki order list abhi khali hai"*) with a button that scrolls to `#hamari-products`.

### 3.6 Inputs (`inputs: 9` — Search Input, Quick WhatsApp Order Builder Fields, Contact Form Controls)
- **Anatomy:** Wrapper container, explicit `<label for="...">` (`font.size.2xl`, `font.weight: 600`), form control (`<input>`, `<select>`, `<textarea>` with `radius.md`, padding `calc(space.6 * 2)`), helper text (`font.size.sm`), and live error message container (`role="alert"`).
- **Variants:** Text/Tel/Email input, Category `<select>`, Quantity stepper input, Multiline `<textarea>`, and Drawer Search bar.
- **State Matrix:**
  - `default`: `space.1` solid border in `color.text.primary` (20% opacity), background `color.text.tertiary`, text `color.text.primary`.
  - `hover`: Border opacity increases to `60%` over `motion.duration.fast`.
  - `focus-visible`: Solid border in `color.text.primary` plus `shadow.2` outer glow (`outline: none` only because replaced by high-contrast border + `shadow.2`).
  - `active`: Typing state maintains focus ring and displays clear/reset button where applicable.
  - `disabled`: `disabled` attribute, `color.surface.raised` background, `opacity: 0.5`, `cursor: not-allowed`.
  - `loading`: Read-only state with trailing spinner during asynchronous submission.
  - `error`: `aria-invalid="true"`, border in `color.state.error`, accompanied by visible text message linked via `aria-describedby`.
- **Keyboard, Pointer & Touch:** `Tab` / `Shift+Tab` moves cleanly between fields; `font-size` **must** remain at least `16px` (`font.size.base`) on mobile viewports to prevent automatic iOS zoom on focus.

---

## 4. Accessibility Requirements and Testable Acceptance Criteria

Target standard: **WCAG 2.2 Level AA**. Every criterion below **must** pass automated and manual verification prior to release.

| ID | Requirement Category | Testable Rule & Implementation Requirement | Pass / Fail Verification Check |
| :--- | :--- | :--- | :--- |
| **A11Y-01** | Color Contrast (WCAG 1.4.3 / 1.4.11) | Primary copy (`color.text.primary` `#1d1d1d`) on light surfaces (`#ffffff`, `#f2f2f2`, `#dde9ae`, `#f1e5f4`, `#e9ccaf`) and inverse copy (`color.text.tertiary` `#ffffff`) on `color.surface.base` (`#000000`) **must** achieve a contrast ratio ≥ `4.5:1` for normal text and ≥ `3:1` for large text and UI boundaries. | **Pass:** Automated axe-core / Lighthouse scan reports `0` contrast violations (`>12:1` achieved across all primary pairings). **Fail:** Any text or essential icon drops below `4.5:1`. |
| **A11Y-02** | Focus Visible (WCAG 2.4.7 / 2.4.11) | Every interactive element (`links: 106`, `buttons: 67`, `inputs: 9`, `<summary>`) **must** display an unobstructed `:focus-visible` indicator combining a `2px` solid outline and `shadow.2` halo. | **Pass:** Tabbing from top to bottom of `index.html` shows a visible focus ring on 100% of stops and never gets obscured by sticky headers. **Fail:** Any control has `outline: none` without a `shadow.2` replacement. |
| **A11Y-03** | Keyboard-First Operation (WCAG 2.1.1 / 2.1.2) | Hero slider, FAQ `<details>` accordions, Search drawer, Mobile Menu drawer, and WhatsApp Order drawer **must** be operable exclusively via keyboard (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`, `ArrowLeft`, `ArrowRight`) with zero keyboard traps. | **Pass:** User can add products to order list, open drawer, and trigger WhatsApp checkout using keyboard only; pressing `Escape` closes any open drawer and restores focus to trigger. **Fail:** Focus is lost or trapped inside a closed drawer. |
| **A11Y-04** | Skip Link & Landmarks (WCAG 2.4.1) | Document **must** begin with a `.skip-to-content-link` targeting `#MainContent` and define `<header>`, `<nav>`, `<main id="MainContent">`, and `<footer>` landmarks. | **Pass:** First `Tab` press reveals "Skip to content" pill at top-left; pressing `Enter` moves focus to `#MainContent`. **Fail:** Missing skip link or duplicate unlabelled `<nav>` landmarks. |
| **A11Y-05** | Target Size & Touch Ergonomics (WCAG 2.5.8) | All interactive controls **must** meet at least `24px × 24px` (and **should** meet `44px × 44px` for primary touch buttons, slider dots, and drawer toggles). | **Pass:** Computed bounding box of buttons and nav toggles is `≥ 44px` or has equivalent non-overlapping spacing. **Fail:** Adjacent controls overlap or measure `< 24px`. |
| **A11Y-06** | Reduced Motion & Auto-Play Control (WCAG 2.2.2 / 2.3.3) | Hero carousel **must** pause on pointer hover and keyboard `focusin`, include an explicit Pause/Play button, and respect `@media (prefers-reduced-motion: reduce)` by disabling marquee scroll and AOS transforms. | **Pass:** Enabling OS "Reduce Motion" stops marquee animation and sets transition durations to instant. **Fail:** Animations continue moving when reduced motion is enabled. |
| **A11Y-07** | Form Labels & Error Identification (WCAG 3.3.1 / 3.3.2) | All `9` inputs **must** have programmatic `<label for>` bindings, `aria-required` where mandatory, and live validation messages announced via `role="alert"` / `aria-invalid="true"`. | **Pass:** Submitting an empty required field focuses the first invalid input, applies `aria-invalid="true"`, and announces the Roman Urdu error guidance. **Fail:** Placeholder text used as the sole label. |

---

## 5. Content and Tone Standards with Examples

- **Tone Profile:** Concise, confident, trustworthy, and implementation-focused — blending **JS Herbal Industry's** authentic Roman Urdu brand voice (*Qudrat, Mayaar, Safai, Jadeed Technology*) with clear e-commerce utility actions.
- **Formatting Rules:**
  - Headings **must** pair an uppercase eyebrow subtitle (`font.size.2xl`, `font.weight: 900`) with a clear value-driven heading.
  - CTA labels **must** start with an explicit verb or destination.

| Surface | Do (Approved Brand & UI Copy) | Don't (Prohibited Ambiguous Copy) |
| :--- | :--- | :--- |
| **Primary Hero CTA** | `Hamari Products Dekhein` / `WhatsApp Par Order Karein` | `Click Here` / `More` / `Submit` |
| **Product Card Action** | `Order List Mein Shamil Karein` / `WhatsApp Par Mangwayein` | `Buy` / `Button` / `Select` |
| **Form Validation Error** | `Barah-e-karam apna naam aur durust WhatsApp number darj karein.` | `Invalid input.` / `Error 400.` |
| **Empty Order Drawer** | `Aapki order list abhi khali hai. Products select kar ke WhatsApp par foran order bhejein.` | `Empty cart.` |
| **Trust & Plant Copy** | `Karachi Chowrangi, Karachi, Pakistan mein waqay hamara manufacturing plant modern machinery aur hygienic extraction facilities se equipped hai.` | Vague unverified claims without facility or quality context. |

---

## 6. Anti-Patterns and Prohibited Implementations

1. **No Raw Hex or Pixel Overrides in Component Selectors:** Authors **must not** hardcode hex values (e.g., `#1d1d1d`) or arbitrary pixel spacing inside component rules; always reference semantic CSS custom properties (`var(--color-text-primary)`, `var(--space-6)`).
2. **No Suppressed Focus Indicators:** Authors **must not** write `:focus { outline: none }` without providing an immediate `:focus-visible` rule using `var(--shadow-2)`.
3. **No Low-Contrast Botanical Text:** Authors **must not** place white text (`color.text.tertiary`) directly onto pastel botanical surfaces (`#dde9ae` lime, `#f1e5f4` lavender, `#e9ccaf` amber); those surfaces **must** always pair with `color.text.primary` (`#1d1d1d`).
4. **No Unbounded Carousel or Marquee Motion:** Authors **must not** ship auto-advancing sliders or infinite marquees that ignore `prefers-reduced-motion: reduce` or lack keyboard pause behavior.
5. **No Ambiguous Interactive Elements:** Authors **must not** use non-semantic `<div>` or `<span>` tags with click handlers for buttons or accordion triggers; use native `<button>`, `<a href>`, and `<details><summary>`.
6. **No Missing Component States:** Authors **must not** ship any interactive component without defined styles and behaviors for all 7 states (`default`, `hover`, `focus-visible`, `active`, `disabled`, `loading`, `error`).

---

## 7. QA Checklist

- [x] **Design Intent & Visual Fidelity:** Replicates `https://www.tibicohealth.com/` layout, typography (`neulis-neue`), botanical color blocks (`#dde9ae`, `#f1e5f4`, `#e9ccaf`, `#f2f2f2`, `#000000`), page loader, top scroll progress bar, scrolling marquees, hero slider, `.tbc-bs.is-soft` product cards, 3-column spotlight, animated SVG hand-drawn underline, alternating 55%/45% split sections, 8-card core values grid, horizontal image reel, and `#f1e5f4` collapsible FAQ accordions.
- [x] **100% Brand Content Completeness:** Includes all provided **JS Herbal Industry** Roman Urdu sections verbatim (Home Hero, Hamare Baare Mein, Hamara Mission, Hamara Vision, Hamari Products — Herbal, Skincare, Wellness, Natural Care, Hamari Khususiyat 1–6, Hamara Manufacturing Plant, Hamara Quality Commitment, Hamari Core Values, Brand Commitment, WhatsApp Par Order Karein, Aam Poochhe Jane Wale Sawalat 1–6, Contact Us, and Footer with Karachi Chowrangi address, `0342-7940339`, `info@arherbal.com`, Mon–Sat 9:00 AM – 6:00 PM).
- [x] **Token Compliance:** All typography (`11.34px`–`16.2px`), color (`#1d1d1d`, `#000000`, `#ffffff`, `#f2f2f2`), spacing (`1px`–`6.75px`), radius (`3px`–`999px`), shadow (`shadow.1`–`shadow.3`), and motion (`100ms`–`700ms`) tokens are declared at `:root` and consumed semantically.
- [x] **7-State Interactive Coverage:** Every interactive component family defines `default`, `hover`, `focus-visible`, `active`, `disabled`, `loading`, and `error` states in CSS and JS.
- [x] **Component Density Verification:** Supports full storefront scale across navigation (`3`), inputs (`9`), lists (`17`), cards (`45`), buttons (`67`), and links (`106`).
- [x] **WCAG 2.2 AA Verification:** Skip link, semantic landmarks, contrast ratios `>12:1`, `:focus-visible` purple glow (`shadow.2`), keyboard-operable drawers/accordions/slider, and `prefers-reduced-motion` media query verified.
