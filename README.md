# Randomize Clip Names

> Generate fresh, abstract three-word names for Arrangement View clips inside a selected time range in Ableton Live.

**Randomize Clip Names** is a lightweight Ableton Live Extension for quickly replacing the names of Arrangement View clips that fall within your selected time range. It generates evocative, unpredictable names such as:

- `Velvet Meteor Orchard`
- `Glacial Resonance Belfry`
- `Nocturnal Sprocket Frontier`
- `Iridescent Undertow Observatory`

It is useful when you want a more visual, playful way to navigate a dense Arrangement View, label experiments, or give sound-design passes and sections of a track a distinct identity.

## Features

- Renames Arrangement View clips that overlap the selected time range on the selected track or tracks
- Generates abstract three-word names from a large pool of combinations
- Uses cryptographically strong random selection for fresh results on every run
- Prevents duplicate names within the same rename batch
- Works with both **Audio Tracks** and **MIDI Tracks**
- Changes clip names only — it does not alter clip audio, MIDI, timing, color, warp settings, devices, automation, or track routing
- Groups the rename pass into a single Live undo action

## Requirements

This Extension currently requires:

- **Ableton Live 12 Suite Beta 12.4.5 or later**
- The packaged .ablx may work on Windows, but it has not yet been tested
- The packaged extension file: `randomize-clip-names-1.2.0.ablx`

> [!IMPORTANT]
> Ableton Extensions are currently part of Ableton Live's public beta workflow. They do not work in Live Standard, Intro, Lite, or earlier Live versions. You do **not** need the Ableton Extensions SDK or Node.js just to install and use the `.ablx` file. [Ableton Extensions FAQ](https://help.ableton.com/hc/en-us/articles/27303428331420-Ableton-Extensions-FAQ)


## More on Ableton Extensions

Want to learn more about what Ableton Extensions are or how to build your own?

- [Read about Extensions on Ableton.com](https://www.ableton.com/en/live/extensions)
- [Explore the Extension SDK](https://ableton.github.io/extensions-sdk)
- [Join Ableton’s Discord](https://discord.gg/ableton) to connect with other users and developers


## Disclaimer

This project was developed with help from AI tools, which assisted with parts of the code, troubleshooting, and documentation. I remain responsible for the design, testing, and final decisions, but it may not be written in the most elegant way.

If AI-assisted development isn’t your thing, no hard feelings at all. Thanks for giving it a look anyway.


## Installation

1. Download `randomize-clip-names-1.2.0.ablx` from this repository's [Releases](../../releases) page.
2. Open **Ableton Live 12 Suite Beta**.
3. Open **Settings/Preferences**:
   - macOS: press `Cmd + ,`
   - Windows: open **Options → Preferences**
4. Select **Extensions**.
5. Drag `randomize-clip-names-1.2.0.ablx` into the Extensions settings page.
6. Restart Live when prompted.

For normal use of the installed `.ablx`, make sure **Developer Mode is turned off**.

## How to Use

1. Switch to **Arrangement View**.
2. On an Audio or MIDI track, make a **time selection** over the area you want to work in.
3. Right-click inside that selected time range on the track lane.
4. Choose **Extensions → Randomize Clip Names**.
5. Every Arrangement clip that overlaps the selected time range on the selected track or tracks receives a new abstract three-word name.

### Example workflow

Imagine an Arrangement track with five clips, and you select a time range that covers only the middle three:

```text
Audio 1
├── Clip 1 (outside selection)
├── Clip 2 (inside selection)
├── Clip 3 (inside selection)
├── Clip 4 (inside selection)
└── Clip 5 (outside selection)
```

Only clips that overlap the active Arrangement time selection are renamed. Clips on the same track outside that range are left unchanged.

After running **Randomize Clip Names**, you might see:

```text
Audio 1
├── Clip 1 (unchanged)
├── Faded Relay Undercroft
├── Luminous Drift Fjord
├── Obsidian Pulse Sanctuary
└── Clip 5 (unchanged)
```

Run the extension again whenever you want a completely fresh set of names.

## Undo

The whole rename operation is performed as one Ableton Live transaction.

Press:

- macOS: `Cmd + Z`
- Windows: `Ctrl + Z`

…once to restore all clip names from that rename pass.

## Naming Behavior

Version 1.2.0 uses three large word banks:

1. **Descriptors** — e.g. `Velvet`, `Glacial`, `Iridescent`
2. **Objects / musical concepts** — e.g. `Meteor`, `Resonance`, `Sprocket`
3. **Places / atmospheres** — e.g. `Orchard`, `Belfry`, `Frontier`

The result is more than two million possible name combinations.

The Extension does not save a permanent history of names. It guarantees no repeated name **within one rename action**, while names generated in future runs remain intentionally random and highly unlikely to repeat.

## Safety

Randomize Clip Names changes **only the names of Arrangement clips that overlap the active time selection**.

It does not change:

- Audio files or samples
- MIDI notes
- Clip placement, length, looping, or warp settings
- Track names or colors
- Devices, effects, parameters, automation, routing, or mixer settings
- Session View clips

Still, as with any tool that changes a Live Set, test it first in a duplicate or saved version of an important project.

## Troubleshooting

### I do not see "Extensions" in the right-click menu

Check all of the following:

- You are running **Ableton Live 12 Suite Beta 12.4.5 or later**.
- You installed the `.ablx` file in **Settings/Preferences → Extensions**.
- You restarted Live after installation.
- **Developer Mode is off** when using the packaged `.ablx`.
- You are in **Arrangement View**, not Session View.
- You created a **time selection** and right-clicked inside the selected range on an Audio or MIDI track lane.

Extensions are context-sensitive: Live only shows them when the selected item matches the Extension's supported context.

### I installed it but an older version appears to run

Remove the old version from **Settings/Preferences → Extensions**, install `randomize-clip-names-1.2.0.ablx`, then restart Live.

### Can I use this in Live Standard, Intro, or Lite?

No. The Ableton Extensions public beta currently requires **Live 12 Suite Beta 12.4.5 or later**.

## Building From Source

If you want to edit or develop the Extension yourself:

```bash
npm install
npm start
```

Build an installable package with:

```bash
npm run package
```

This produces an `.ablx` file in the project folder.

Development requires the Ableton Extensions SDK, Node.js, and a compatible Ableton Live 12 Suite Beta installation. See the [official Ableton Extensions SDK documentation](https://ableton.github.io/extensions-sdk/).

## Version History

### v1.2.0

- Fixed a bug where every clip on the selected tracks was renamed, even clips outside the highlighted time range. Only clips overlapping the selection are renamed now, as documented
- Replaced per-track guesswork with a single track lookup, so selecting a Return or Group track lane no longer aborts the run halfway through
- Split the code into modules and hardened input validation
- Naming behavior is unchanged: same word banks, same crypto-strong random picks, still no duplicates within one rename pass

### v1.1.0

- Replaced the original small two-word name pool with expanded three-word abstract names
- Added much larger descriptor, object, and atmosphere word banks
- Switched to cryptographically strong random selection
- Prevented duplicate names within a single rename action
- Preserved the one-click workflow and single-step undo behavior

### v1.0.0

- Initial release
- Batch-renamed Arrangement View clips using randomly generated abstract names

## License

MIT License. See [`LICENSE`](LICENSE) for details.

## Credits

Built by Tyler W. Supernor with the [Ableton Extensions SDK](https://ableton.github.io/extensions-sdk/).

Ableton Live is a trademark of Ableton AG. This project is an independent community tool and is not affiliated with or endorsed by Ableton AG.
