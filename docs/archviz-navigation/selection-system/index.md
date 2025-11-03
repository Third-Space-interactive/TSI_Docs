# Selection System

The selection system is set up and controlled via the `BP_SelectionManager` blueprint. It handles hover-to-highlight functionality for selectable objects and allows users to select objects to focus the camera and lock orbit around them.

## Features

- **Hover to Highlight**: Objects highlight when the cursor hovers over them
- **Click to Select**: Click on objects to select them
- **Camera Focus**: Selected objects automatically focus the camera
- **Orbit Lock**: Camera orbits lock around the selected object

## Setup Requirements

### IMPORTANT: Collision Channel Configuration

Both selection and hover rely on the **"selectableMesh"** object collision channel.

To make any mesh selectable:

1. Select the mesh in your level
2. In the **Details** panel, find **Collision** settings
3. Set **Collision Presets** to `Custom`
4. Set the **selectableMesh** channel appropriately

### Example Configuration

```
Collision Preset: Custom
selectableMesh: Block (or Overlap depending on your needs)
```

## BP_SelectionManager

The selection manager blueprint handles:
- Ray tracing for cursor detection
- Object highlighting on hover
- Selection state management
- Camera focus transitions
- Orbit lock behavior

## Using the Selection System

1. **Add BP_SelectionManager** to your level
2. Configure **selectable meshes** with the correct collision channel
3. The system will automatically handle hover and selection

## Customization

The selection manager can be customized in the blueprint to adjust:
- Highlight colors and materials
- Selection behavior
- Camera focus speed
- Orbit lock parameters

## Next Steps

- [Post Processing Setup →](../post-processing-setup)
- [Basic Navigation →](../basic-navigation/setup)
- [Advanced Navigation →](../advanced-navigation/setup)
