# Landscape CRM — Telegram Mini App

A full migration of the React Native / Expo CRM app to a **Vite + React + TypeScript + Tailwind CSS** web app, deployable as a [Telegram Mini App (TMA)](https://core.telegram.org/bots/webapps).

---

## Tech Stack

| Layer | Library |
|---|---|
| Build | Vite 5 |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS 3 |
| Routing | React Router DOM 6 |
| Icons | lucide-react |
| TG SDK | `telegram-web-app.js` (CDN, loaded in `index.html`) |

---

## Project Structure

```
tma/
├── index.html                        # Telegram SDK <script> tag lives here
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── postcss.config.js
└── src/
    ├── main.tsx                      # React entry point
    ├── App.tsx                       # Router + auth guard + TG init
    ├── index.css                     # Tailwind directives + Telegram CSS vars
    ├── hooks/
    │   └── useTelegram.ts            # Calls WebApp.ready() + WebApp.expand()
    ├── lib/                          # Pure logic — identical to the RN version
    │   ├── auth.ts
    │   ├── data.ts
    │   ├── onboarding-data.ts
    │   ├── onboarding-types.ts
    │   ├── session-context.tsx
    │   ├── theme.ts
    │   └── types.ts
    ├── components/
    │   ├── ui/
    │   │   ├── StatusBadge.tsx       # Hot / Warm / Cold badge
    │   │   └── Toggle.tsx            # Animated toggle switch (CSS transition)
    │   └── onboarding/
    │       ├── OptionButton.tsx      # Radio + checkbox option card
    │       └── ProgressBar.tsx       # Step progress bar
    └── pages/
        ├── LoginPage.tsx             # Login screen with demo accounts
        ├── admin/
        │   ├── AdminApp.tsx          # Bottom tab shell (Leads / Calendar / Projects / Profile)
        │   ├── LeadsScreen.tsx
        │   ├── CalendarScreen.tsx
        │   ├── ProjectsScreen.tsx    # Horizontal Kanban board
        │   └── ProfileScreen.tsx
        └── client/
            ├── ClientApp.tsx         # Bottom tab shell (Book / Profile)
            ├── OnboardingScreen.tsx  # 7-step booking wizard
            └── ClientProfileScreen.tsx
```

---

## Local Development

```bash
cd tma
npm install
npm run dev
# → http://localhost:5173
```

The Telegram SDK script no-ops gracefully in a regular browser, so you can develop and test the full UI without opening Telegram.

> **Demo accounts** are shown on the login screen:
> - `admin / admin` — opens the Admin CRM dashboard
> - `user / user` — opens the Client booking wizard

---

## Build for Production

```bash
npm run build
# Output: tma/dist/
```

---

## Deployment

### Option A — Vercel (recommended)

1. Install the Vercel CLI: `npm i -g vercel`
2. From inside the `tma/` folder run: `vercel`
3. Follow the prompts. Set the **root directory** to `tma` if deploying from the repo root.
4. You'll get a URL like `https://landscape-crm-tma.vercel.app`.

**Or** drag-and-drop the `dist/` folder to [vercel.com/new](https://vercel.com/new) → "Deploy" — no CLI needed.

### Option B — GitHub Pages

1. Push the repo to GitHub.
2. Add the `gh-pages` package: `npm i -D gh-pages`
3. Add a deploy script to `package.json`:
   ```json
   "deploy": "gh-pages -d dist"
   ```
4. Run `npm run build && npm run deploy`.
5. In your repo → **Settings → Pages → Source** select the `gh-pages` branch.

> `vite.config.ts` already sets `base: "./"` so all asset paths are relative and work on any subdirectory hosting.

---

## Creating a Telegram Bot & Mini App

### Step 1 — Create a bot

1. Open Telegram and search for **@BotFather**.
2. Send `/newbot`.
3. Enter a display name, e.g. `Landscape CRM`.
4. Enter a username, e.g. `landscape_crm_bot` (must end in `bot`).
5. Copy the **bot token** — keep it private.

### Step 2 — Create a Mini App

In the same @BotFather chat:

```
/newapp
```

- Choose your bot from the list.
- Set an app name, e.g. `app`.
- Set the **Web App URL** to your deployed URL, e.g. `https://landscape-crm-tma.vercel.app`.
- Upload a 640 × 360 px preview image (any landscape photo works for now).

BotFather will confirm creation.

### Step 3 — Add a Menu Button

This puts an icon next to the message input so users can open the app with one tap:

```
/mybots
→ Select your bot
→ Bot Settings
→ Menu Button
→ Edit Menu Button URL  → paste your deployed URL
→ Edit Menu Button Text → e.g. "Open CRM"
```

### Step 4 — Your shareable link

```
t.me/landscape_crm_bot/app
```

Replace `landscape_crm_bot` with your bot username and `app` with the short name you chose in Step 2. This link opens the Mini App directly on iOS and Android.

You can also share it as an **Inline Button** in any bot message:

```json
{
  "inline_keyboard": [[
    { "text": "Open CRM", "web_app": { "url": "https://landscape-crm-tma.vercel.app" } }
  ]]
}
```

---

## Telegram SDK Integration Notes

The hook `src/hooks/useTelegram.ts` runs on mount and:

1. Calls `WebApp.ready()` — tells Telegram the app has finished loading (removes the loading spinner).
2. Calls `WebApp.expand()` — requests full viewport height.

To use the **Back Button** on any screen:

```ts
const { tg } = useTelegram();

useEffect(() => {
  if (!tg) return;
  tg.BackButton.show();
  tg.BackButton.onClick(handleBack);
  return () => tg.BackButton.hide();
}, []);
```

To use the **Main Button** (green button at the bottom):

```ts
tg.MainButton.setText("Confirm Booking");
tg.MainButton.show();
tg.MainButton.onClick(handleConfirm);
```

Telegram CSS variables are declared as fallbacks in `src/index.css` so the app looks correct both inside and outside Telegram:

```css
var(--tg-theme-bg-color)
var(--tg-theme-text-color)
var(--tg-theme-button-color)
```

---

## RN → Web Migration Reference

| React Native | Web equivalent used |
|---|---|
| `<View>` | `<div>` |
| `<Text>` | `<span>` / `<p>` / `<h*>` |
| `<ScrollView>` | `<div className="overflow-y-auto">` |
| `<FlatList>` | `.map()` inside a `<div>` |
| `<Pressable onPress>` | `<button onClick>` |
| `StyleSheet.create` | Tailwind classes + inline `style` for dynamic colors |
| `SafeAreaInsets` | `env(safe-area-inset-bottom)` via `.pb-safe` |
| `Animated.Value` | CSS `transition` |
| `AsyncStorage` | `localStorage` |
| `expo-location` | `navigator.geolocation` |
| `Linking.openURL` | `window.open(url, '_blank')` |
| `KeyboardAvoidingView` | Not needed — browsers handle this natively |
