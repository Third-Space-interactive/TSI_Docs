# Basic Navigation Setup

Perfect for single focus assets ranging in scale from an object to a building.

## Installation

1. Open your Unreal Engine project
2. Navigate to **Window > World Settings**
3. Set your **Game Mode** to `TSI_Gamemode_Basic`

![Set Basic Game Mode](/img/archviz-nav/basic-1.png)

This will automatically configure:

- Appropriate player character
- Player controller
- HUD class

## Setting Spawn Location

To set where the player spawns:

1. Place a **PlayerStart** actor in your level
2. Position it at your desired spawn location
3. The player will automatically spawn at this location when the app starts

![Set Player Start](/img/archviz-nav/basic-2.png)
![Set Start Location](/img/archviz-nav/basic-3.png)

## How It Works

The basic navigation system relies on a camera attached to the pawn via a spring arm:

- The **camera is always focused** on the pawn which is at the centre of the screen
- **Zooming** increases/decreases the length of the spring arm
- This creates smooth zoom into the centre of the screen

![Set Start Location](/img/archviz-nav/basic-4.png)

## Camera System

The spring arm-based system provides:

- Consistent center-screen focus
- Smooth zoom in/out
- Automatic collision detection
- Natural camera movement

## Next Steps

- [Selection System Setup →](../selection-system)
- [Post Processing Setup →](../post-processing-setup)
- [Advanced Navigation →](../advanced-navigation/setup)
