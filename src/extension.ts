import {
  initialize,
  type ActivationContext,
  type ArrangementSelection,
  Track,
} from "@ableton-extensions/sdk";
import { randomClipName } from "./name-generator.js";

const COMMAND_ID = "randomizeClipNames.run";
const MENU_TITLE = "Randomize Clip Names";
const CONTEXT_MENU_SCOPES = [
  "AudioTrack.ArrangementSelection",
  "MidiTrack.ArrangementSelection",
] as const;

function isArrangementSelection(arg: unknown): arg is ArrangementSelection {
  return (
    typeof arg === "object" &&
    arg !== null &&
    Array.isArray((arg as ArrangementSelection).selected_lanes)
  );
}

export function activate(activation: ActivationContext) {
  const context = initialize(activation, "1.0.0");

  context.commands.registerCommand(COMMAND_ID, (arg: unknown) => {
    if (!isArrangementSelection(arg)) return;

    const start = arg.time_selection_start;
    const end = arg.time_selection_end;

    if (arg.selected_lanes.length === 0) {
      return;
    }

    const usedInThisRun = new Set<string>();

    context.withinTransaction(() => {
      for (const trackHandle of arg.selected_lanes) {
        const track = context.getObjectFromHandle(trackHandle, Track);

        for (const clip of track.arrangementClips) {
          if (clip.endTime > start && clip.startTime < end) {
            clip.name = randomClipName(usedInThisRun);
          }
        }
      }
    });
  });

  for (const scope of CONTEXT_MENU_SCOPES) {
    context.ui.registerContextMenuAction(scope, MENU_TITLE, COMMAND_ID);
  }
}
