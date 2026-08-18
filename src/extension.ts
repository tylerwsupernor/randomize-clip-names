import {
  initialize,
  type ActivationContext,
  type ArrangementSelection,
  type Handle,
  AudioTrack,
  MidiTrack,
} from "@ableton-extensions/sdk";
import { randomInt } from "node:crypto";

const DESCRIPTORS = [
  "Velvet", "Crimson", "Golden", "Rusty", "Chrome", "Amber", "Obsidian", "Gilded", "Ashen", "Pale",
  "Ivory", "Copper", "Silver", "Bronze", "Cobalt", "Ebony", "Marble", "Pearl", "Onyx", "Jade",
  "Scarlet", "Violet", "Indigo", "Crystalline", "Porcelain", "Slate", "Charcoal", "Sable", "Alabaster", "Sepia",
  "Frosted", "Tarnished", "Weathered", "Polished", "Brushed", "Etched", "Painted", "Stained", "Bleached", "Faded",
  "Dusty", "Fractured", "Hollow", "Silent", "Warped", "Glacial", "Molten", "Feral", "Static", "Broken",
  "Nocturnal", "Sunken", "Wandering", "Frozen", "Burning", "Distant", "Hidden", "Restless", "Weightless", "Shattered",
  "Withered", "Tangled", "Drifting", "Charged", "Muted", "Echoing", "Rippled", "Ragged", "Spectral", "Jagged",
  "Faint", "Feverish", "Ghostly", "Bruised", "Vaporous", "Splintered", "Hazy", "Wild", "Lonely", "Frayed",
  "Coiled", "Blazing", "Crumbling", "Dormant", "Trembling", "Suspended", "Vanishing", "Unraveling", "Flickering",
  "Neon", "Analog", "Electric", "Luminous", "Radiant", "Iridescent", "Vivid", "Glowing", "Shimmering", "Blinding",
  "Prismatic", "Fluorescent", "Incandescent", "Phosphorescent", "Opalescent", "Reflective", "Translucent", "Glossy", "Matte", "Metallic",
  "Sparking", "Smoldering", "Pulsing", "Strobing", "Gleaming", "Glinting", "Flaring", "Dazzling", "Searing", "Glimmering",
  "Melancholic", "Euphoric", "Serene", "Turbulent", "Wistful", "Somber", "Ecstatic", "Brooding", "Tranquil", "Frantic",
  "Yearning", "Mournful", "Jubilant", "Uneasy", "Placid", "Reverent", "Defiant", "Solitary", "Nostalgic", "Fleeting",
  "Tender", "Ferocious", "Delicate", "Volatile", "Weary", "Hopeful", "Haunted", "Serendipitous", "Reckless", "Composed",
];

const OBJECTS = [
  "Groove", "Pulse", "Signal", "Loop", "Circuit", "Motif", "Cipher", "Chord", "Resonance", "Impulse",
  "Wavelength", "Frequency", "Cadence", "Rhythm", "Harmonic", "Overtone", "Reverb", "Drone", "Timbre", "Refrain",
  "Ostinato", "Crescendo", "Downbeat", "Backbeat", "Sustain", "Vibrato", "Tremolo", "Feedback", "Sequence", "Arpeggio",
  "Drift", "Echo", "Bloom", "Fracture", "Cascade", "Tide", "Ember", "Current", "Mirage", "Haze",
  "Meteor", "Comet", "Quartz", "Vapor", "Nebula", "Aurora", "Cinder", "Frost", "Gale", "Monsoon",
  "Wildfire", "Undertow", "Avalanche", "Sediment", "Erosion", "Magnetism", "Gravity", "Tremor", "Vortex", "Eclipse",
  "Shard", "Vertex", "Lantern", "Compass", "Reactor", "Prism", "Anchor", "Beacon", "Tunnel", "Wire",
  "Engine", "Frame", "Relay", "Chamber", "Filament", "Node", "Aperture", "Fuse", "Grid", "Pendulum",
  "Lever", "Gauge", "Valve", "Piston", "Cog", "Sprocket", "Turbine", "Rotor", "Coil", "Capacitor",
  "Horizon", "Orbit", "Spiral", "Threshold", "Rift", "Cluster", "Halo", "Voltage", "Sensor", "Fragment",
  "Wavefront", "Paradox", "Enigma", "Axiom", "Vector", "Momentum", "Continuum", "Nexus", "Parallax", "Singularity",
  "Genesis", "Zenith", "Nadir", "Apex", "Echelon", "Vestige", "Relic", "Artifact", "Omen",
];

const ATMOSPHERES = [
  "Meadow", "Canyon", "Tundra", "Valley", "Desert", "Glacier", "Highlands", "Prairie", "Coast", "Forest",
  "Wasteland", "Basin", "Ridge", "Delta", "Grove", "Marsh", "Plateau", "Reef", "Skyline", "Summit",
  "Steppe", "Savanna", "Fjord", "Archipelago", "Badlands", "Moor", "Bluff", "Butte", "Mesa", "Dune",
  "Cathedral", "Orchard", "Harbor", "Foundry", "Archive", "Observatory", "Terminal", "Corridor", "Chapel", "Vault",
  "Atrium", "Bazaar", "Outpost", "Refuge", "Passage", "Sanctuary", "Junction", "Overlook", "Crossing", "Pier",
  "Wharf", "Enclave", "Belfry", "Rotunda", "Promenade", "Undercroft", "Spire", "Citadel", "Bastion", "Colonnade",
  "Frontier", "Expanse", "Clearing", "Ruins", "Terrace", "Causeway", "Reservoir", "Quarry", "Hollow", "Garden",
  "Underpass", "Overpass", "Borderland", "Hinterland", "Perimeter", "Enclosure", "Sanctum", "Precinct", "District",
  "Territory", "Domain", "Realm", "Reach", "Stretch", "Tract", "Belt", "Zone", "Margin",
  "Nebula", "Galaxy", "Constellation", "Aurora", "Eclipse", "Solstice", "Equinox", "Meridian", "Zenith", "Cosmos",
  "Stratosphere", "Ionosphere", "Exosphere", "Heliosphere", "Magnetosphere", "Umbra", "Penumbra", "Corona", "Nova", "Quasar",
  "Pulsar", "Void", "Starfield", "Skyway", "Firmament", "Ether", "Aether", "Empyrean",
];

function pick(words: string[]): string {
  return words[randomInt(words.length)];
}

function randomClipName(usedInThisRun: Set<string>): string {
  let name: string;
  let attempts = 0;
  do {
    name = `${pick(DESCRIPTORS)} ${pick(OBJECTS)} ${pick(ATMOSPHERES)}`;
    attempts++;
  } while (usedInThisRun.has(name) && attempts < 25);
  usedInThisRun.add(name);
  return name;
}

export function activate(activation: ActivationContext) {
  const context = initialize(activation, "1.0.0");

  context.commands.registerCommand("randomizeClipNames.run", (arg: unknown) => {
    const selection = arg as ArrangementSelection;
    const trackHandles: Handle[] = selection.selected_lanes ?? [];

    if (trackHandles.length === 0) {
      return;
    }

    const usedInThisRun = new Set<string>();

    context.withinTransaction(() => {
      for (const trackHandle of trackHandles) {
        let clips;

        try {
          const audioTrack = context.getObjectFromHandle(trackHandle, AudioTrack);
          clips = audioTrack.arrangementClips;
        } catch {
          const midiTrack = context.getObjectFromHandle(trackHandle, MidiTrack);
          clips = midiTrack.arrangementClips;
        }

        for (const clip of clips) {
          clip.name = randomClipName(usedInThisRun);
        }
      }
    });
  });

  context.ui.registerContextMenuAction(
    "AudioTrack.ArrangementSelection",
    "Randomize Clip Names",
    "randomizeClipNames.run",
  );

  context.ui.registerContextMenuAction(
    "MidiTrack.ArrangementSelection",
    "Randomize Clip Names",
    "randomizeClipNames.run",
  );
}