---
published: true
name: taskrail
description: project issue tracker with a local-first client and crdt sync
thumbnail: taskrail.png
ogImage: taskrail.png
images: [taskrail.png]
github: https://github.com/HassanMunene/taskrail
date: 2026-08-25
---

taskrail is an issue tracker built around one question: why does every tracker stop working when your connection does? the client keeps a full local copy of the board, mutations apply instantly offline, and a crdt sync layer reconciles everything when connectivity returns — no merge dialogs, no lost edits.

## the local-first bet

traditional apps treat the network as a prerequisite. local-first flips that: the network is an optimization. the practical consequences:

- **crdts instead of last-write-wins.** issue titles, descriptions, and status flows are represented as conflict-free replicated data types, so two people editing the same issue on a plane merge deterministically later.
- **an operation log as the core abstraction.** "move card to done" is an event, not a row update. the local store replays events, the server is just another replica that persists and broadcasts them.
- **presence and subscriptions.** viewers see who's looking at what in real time; websockets push deltas, not snapshots.

## where it gets hard

crdts are famously "just math" until you meet ui reality: how do you render "two people renamed this card" as one line of text? tombstones and garbage collection? undo across concurrent edits? most of the project's time went into these seams, not the sync protocol itself.

## status

in active development: kanban and list views shipped, comments and file attachments in progress. the longer-term goal is a sync engine generic enough to extract into its own library.
