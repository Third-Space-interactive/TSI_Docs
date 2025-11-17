# Selection System

The selection system provides visual feedback when hovering over and selecting objects in your scene. It uses a post-process material to highlight objects with custom outline effects.

> Part of the **UE5 Navigation Template** featuring Google Earth-style controls for architectural visualization.

## Features

- **Hover to Highlight**: Objects highlight when the cursor hovers over them
- **Click to Select**: Click on objects to select them
- **Camera Focus**: Selected objects automatically focus the camera
- **Orbit Lock**: Camera orbits lock around the selected object
- **Customizable Highlight**: Fully customizable highlight color, width, and glow

![Selection System Demo](/img/archviz-nav/selection-demo.webp)

---

## How It Works

The selection system uses two main components:

1. **BP_SelectionManager** - Blueprint that handles hover/selection logic
2. **MI_SelectionHighlight** - Post-process material that renders the highlight effect

When you hover or select an object:
1. BP_SelectionManager performs a ray trace to detect the object
2. The object is rendered to a custom stencil buffer
3. MI_SelectionHighlight post-process material reads the stencil
4. The highlight appears as a colored outline around the object

---

## Setup Requirements

### Step 1: Collision Channel Configuration

**IMPORTANT:** Both selection and hover rely on the **"SelectableMesh"** object collision channel.

To make any mesh selectable:

1. Select the mesh in your level
2. In the **Details** panel, find **Collision** settings
3. Set **Collision Presets** to `Custom`
4. Set **Object Type** to **SelectableMesh**

![Setting selectable mesh collision](/img/archviz-nav/selectable-collision.webp)

> **See:** [Basic Navigation Setup](../basic-navigation/setup#step-2-configure-collision-channels) for detailed instructions on creating the SelectableMesh collision channel.

---

### Step 2: Add Post-Process Material

The highlight effect requires a post-process material to be added to your level.

#### Add Post-Process Volume (if needed)

1. Check if your level already has a **Post Process Volume** in the **Outliner**
2. If not, add one:
   - Click **+** in the **Place Actors** panel
   - Search for "**Post Process Volume**"
   - Drag into your level
3. Select the Post Process Volume
4. In **Details**, check **Infinite Extent (Unbound)**

#### Add Selection Highlight Material

1. Select your **Post Process Volume** in the **Outliner**
2. In the **Details** panel, search for "**material**"
3. Find **Rendering Features > Post Process Materials**
4. Click the **+** dropdown to add a new array element
5. Set to **Asset Reference** (not Blendable)
6. Click the asset selector dropdown

![Adding post-process material array](/img/archviz-nav/postprocess-material.webp)

#### Select MI_SelectionHighlight

1. Navigate to: `ArchvizNavigation/Materials/Highlight/`
2. Select **MI_SelectionHighlight**
3. Close the asset picker

The selection highlight is now active!

---

## Customizing the Highlight

### Opening the Material Instance

1. In **Content Browser**, navigate to: `ArchvizNavigation/Materials/Highlight/`
2. Double-click **MI_SelectionHighlight**
3. The Material Instance Editor opens

### Available Parameters

#### Highlight Color

**Type:** Linear Color (RGB)
**Default:** Orange `(1.0, 0.5, 0.0)`
**Usage:** Main color of the selection outline

**Example Colors:**
- Blue: `(0.0, 0.5, 1.0)`
- Green: `(0.0, 1.0, 0.5)`
- Red: `(1.0, 0.0, 0.0)`
- White: `(1.0, 1.0, 1.0)`

![Customizing highlight color](/img/archviz-nav/highlight-color.webp)

#### Line Width

**Type:** Scalar
**Range:** 0.5 - 5.0
**Default:** 2.0
**Usage:** Thickness of the outline

- **Thin outline:** 0.5 - 1.0
- **Medium outline:** 1.5 - 2.5
- **Thick outline:** 3.0 - 5.0

#### Falloff

**Type:** Scalar
**Range:** 0.0 - 2.0
**Default:** 1.0
**Usage:** Softness of the outline edge

- **Sharp edge:** 0.0 - 0.3
- **Medium softness:** 0.5 - 1.0
- **Soft glow:** 1.5 - 2.0

#### Glow Intensity

**Type:** Scalar
**Range:** 0.5 - 3.0
**Default:** 1.5
**Usage:** Brightness multiplier

- **Subtle:** 0.5 - 1.0
- **Normal:** 1.0 - 2.0
- **Bright:** 2.0 - 3.0

### Recommended Presets

#### Preset 1: Subtle Blue (Professional)
```
Highlight Color: (0.0, 0.5, 1.0)
Line Width: 1.5
Falloff: 0.8
Glow Intensity: 1.0
```

#### Preset 2: Bold Orange (Attention)
```
Highlight Color: (1.0, 0.5, 0.0)
Line Width: 3.0
Falloff: 1.5
Glow Intensity: 2.0
```

#### Preset 3: Clean White (Minimal)
```
Highlight Color: (1.0, 1.0, 1.0)
Line Width: 1.0
Falloff: 0.3
Glow Intensity: 0.8
```

---

## BP_SelectionManager

The selection manager blueprint handles the core selection logic:

- Ray tracing for cursor detection
- Object highlighting on hover
- Selection state management
- Camera focus transitions
- Orbit lock behavior

### Using the Selection System

1. **BP_SelectionManager** is automatically included in the TSI game modes
2. Configure **selectable meshes** with the SelectableMesh collision channel
3. Add **MI_SelectionHighlight** to your Post Process Volume
4. The system will automatically handle hover and selection

### Customization

The selection manager can be customized in the blueprint to adjust:
- Highlight behavior
- Selection rules
- Camera focus speed
- Orbit lock parameters
- Transition animations

---

## Testing the Selection System

### In-Editor Testing

1. Press **Play** (Alt + P)
2. Move mouse over objects with **SelectableMesh** collision
3. Verify highlight appears
4. Click to select and verify camera focuses
5. Test first person mode selection

### Troubleshooting

Having issues with the selection system? See the [Troubleshooting Guide](../troubleshooting) for detailed solutions:

- [No Highlight Appears](../troubleshooting#no-highlight-on-hover)
- [Objects Not Selectable](../troubleshooting#objects-not-selectable)
- [Highlight Color Wrong](../troubleshooting#highlight-color-wrong)
- [General Troubleshooting](../troubleshooting)

---

## Use Cases

### Architectural Walkthroughs

**Goal:** Subtle, professional highlights

**Recommended Settings:**
```
Color: Light Blue (0.2, 0.6, 1.0)
Line Width: 1.5
Falloff: 0.5
Glow Intensity: 1.0
```

### Product Configurators

**Goal:** Bold, eye-catching highlights

**Recommended Settings:**
```
Color: Bright Orange (1.0, 0.6, 0.0)
Line Width: 3.0
Falloff: 1.5
Glow Intensity: 2.5
```

### Museum Experiences

**Goal:** Elegant, minimal highlights

**Recommended Settings:**
```
Color: White (1.0, 1.0, 1.0)
Line Width: 1.0
Falloff: 0.3
Glow Intensity: 0.8
```

---

## Performance Considerations

The selection highlight material has minimal performance impact:
- Single post-process pass
- Stencil buffer read (very fast)
- Screen-space effect (resolution-dependent)

### Optimization Tips

1. **Use simple falloff** - Lower falloff values = faster rendering
2. **Limit concurrent selections** - Only highlight one object at a time
3. **Disable when not needed** - Turn off post-process when UI is open
4. **Mobile considerations** - Reduce glow intensity on mobile devices

---

## Next Steps

- [Basic Navigation →](../basic-navigation/setup) *(Complete setup guide)*
- [Advanced Navigation →](../advanced-navigation/setup) *(For larger scale projects)*
- [Troubleshooting →](../troubleshooting) *(Common issues and solutions)*
