# Wire world

This is a open framework implementation of a cellular automaton called [wire world](https://en.wikipedia.org/wiki/Wireworld).

The rule is rather simple:

1. Empty keeps empty.
1. Tail becomes conductor
1. Head becomes Tail
1. Conductor becomes head if there are 1 or 2 heads around

The code are the image files located in `bin/data`. I use the following colors to flag the state of each cell :

- `#000000`: Empty
- `#fec549`: Conductor
- `#1899c9`: Tail
- `#f38f91`: Head

I'm printing the conductor as dark grey to look better but to design I use yellow.

All the complexity is achieved by designing patterns of conductors and Tail/Head (electron) arrangement.

[Video of wire world automaton outputing rule 110](https://youtu.be/HY_w05ehNi0)
