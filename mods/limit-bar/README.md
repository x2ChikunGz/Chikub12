# limit-bar

A Claude Code mod that draws usage-limit bars (5-hour window, 7-day window, and chat context fill) in a band above the message box, with the time left until each window resets. Colors turn amber at 70% and red at 90%. It reads the figures from the session itself, so it needs a subscription plan that reports rate limits; without them it shows a short waiting note. Copy this folder to a mods folder or load it with --plugin-dir.
