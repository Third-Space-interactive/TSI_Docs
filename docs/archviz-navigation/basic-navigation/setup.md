# Basic Navigation Setup

Perfect for single focus assets ranging in scale from an object to a building.

> Part of the **UE5 Navigation Template** featuring Google Earth-style controls for architectural visualization.

## When to Use Basic Navigation

- Single building applications
- Product configurators
- Simple architectural visualizations
- Indoor showroom experiences
- Focus on a single asset or structure

## Complete Setup Guide

Follow these steps to set up Basic Navigation in your project:

---

## Step 1: Set Game Mode

1. Open your Unreal Engine level
2. Navigate to **Window > World Settings**
3. Set your **Game Mode** to `TSI_Gamemode_Basic`

![Set Basic Game Mode](/img/archviz-nav/basic-1.webp)

This will automatically configure:

- Appropriate player character
- Player controller
- HUD class

---

## Step 2: Configure Collision Channels

To enable click-to-move and object selection, create custom collision channels.

### Create Collision Channels

1. Open **Edit > Project Settings**
2. Search for "**object**"
3. Navigate to **Engine > Collision > Object Channels**
4. Click **New Object Channel**
5. Create two channels:
   - **Name:** `SelectableMesh` | **Default Response:** Block
   - **Name:** `FloorPlate` | **Default Response:** Block

![Creating collision channels](/img/archviz-nav/collision-channels.webp)

> **Note:** These collision channels are essential for the navigation system to detect clickable floors and selectable objects.

---

## Step 3: Assign Floor Collision

For click-to-move functionality, assign collision to all walkable surfaces.

1. Select all floor elements in your scene (tiles, ground planes, etc.)
2. In the **Details** panel, search for "**collision**"
3. Set **Collision Presets** to **Custom**
4. Set **Object Type** to **FloorPlate**

![Setting floor plate collision](/img/archviz-nav/floor-collision.webp)

**What to tag as FloorPlate:**
- Floor tiles
- Ground planes
- Walkable surfaces
- Stairs and ramps

---

## Step 4: Assign Selectable Mesh Collision

For object selection and highlighting:

1. Select objects you want to be selectable (furniture, walls, features, etc.)
2. In the **Details** panel, search for "**collision**"
3. Set **Collision Presets** to **Custom**
4. Set **Object Type** to **SelectableMesh**

![Setting selectable mesh collision](/img/archviz-nav/selectable-collision.webp)

---

## Step 5: Add Player Start

The Player Start actor defines where the camera spawns.

1. Click the **+** icon in the toolbar (Place Actors panel)
2. Search for "**Player Start**"
3. Drag it into your scene
4. Position it at your desired spawn location
5. Rotate it to set the initial camera direction

![Set Player Start](/img/archviz-nav/basic-2.webp)
![Set Start Location](/img/archviz-nav/basic-3.webp)

> **Tip:** Center the Player Start in your building for the best initial view.

---

## Step 6: Configure Selection Material

Create a visual highlight when hovering and selecting objects.

### Add Post-Process Material

1. Locate your **Post Process Volume** in the **Outliner**
   - If you don't have one, add one: Place Actors > Post Process Volume, then enable **Infinite Extent**
2. In the **Details** panel, search for "**material**"
3. Find **Rendering Features > Post Process Materials**
4. Click the **+** dropdown to add a new array element
5. Choose **Asset Reference**

### Select Highlight Material

1. Click the asset selector
2. Navigate to: `ArchvizNavigation/Materials/Highlight/`
3. Select **MI_SelectionHighlight**

![Adding post-process material](/img/archviz-nav/postprocess-material.webp)

### Customize Highlight Color (Optional)

To change the highlight color:

1. Open **MI_SelectionHighlight** in Content Browser
2. Adjust the following parameters:
   - **Highlight Color** - Main selection color
   - **Line Width** - Thickness of outline
   - **Falloff** - Edge softness
   - **Glow Intensity** - Brightness of effect
3. Save the material

![Customizing selection highlight](/img/archviz-nav/highlight-color.webp)

---

## Step 7: Test Your Setup

Press **Alt + P** (or click Play) to test your navigation:

### Third Person Mode (Default)
- **Left Mouse Button** - Orbit around focused point
- **Right Mouse Button** - Pan camera
- **Mouse Wheel** - Zoom in/out
- **Click Object** - Focus and lock orbit to object
- **Hover Object** - Highlight object

### First Person Mode
- **F Key** - Switch to first person
- **Left Mouse Button** - Look around
- **Right Mouse Button** - Strafe (forward/backward/left/right)
- **Click Floor** - Move to location
- **Mouse Wheel** - Change FOV (zoom)

**Verify:**
- ✅ Camera spawns at Player Start location
- ✅ Objects highlight when you hover over them
- ✅ Clicking objects focuses camera and locks orbit
- ✅ In first person, you can click floor to move
- ✅ Camera transitions smoothly between modes

---

## How It Works

The basic navigation system relies on a camera attached to the pawn via a spring arm:

- The **camera is always focused** on the pawn which is at the centre of the screen
- **Zooming** increases/decreases the length of the spring arm
- This creates smooth zoom into the centre of the screen

![Spring Arm System](/img/archviz-nav/basic-4.webp)

## Camera System

The spring arm-based system provides:

- Consistent center-screen focus
- Smooth zoom in/out
- Automatic collision detection
- Natural camera movement

---

## Troubleshooting

Having issues? See the [Troubleshooting Guide](../troubleshooting) for detailed solutions to common problems:

- [Can't Click to Move](../troubleshooting#cant-click-to-move)
- [Objects Not Highlighting](../troubleshooting#objects-not-selectable)
- [Falling Through Floor](../troubleshooting#falling-through-floor-first-person-mode)
- [Camera Issues](../troubleshooting#camera-issues)
- [Performance Problems](../troubleshooting#performance-issues)

---

## Next Steps

- [Selection System Details →](../selection-system)
- [Camera Configuration →](../camera-configuration) *(Add camera lag for smoother movement)*
- [Troubleshooting →](../troubleshooting) *(Common issues and solutions)*
- [Advanced Navigation →](../advanced-navigation/setup) *(For larger scale projects)*
