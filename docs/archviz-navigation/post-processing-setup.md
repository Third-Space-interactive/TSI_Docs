# Post Processing Setup

Post processing is required for certain visual effects in the ArchViz Navigation Template.

## Setup Instructions

### 1. Check for Existing Post Process Volume

First, check if your level already has a Post Process Volume:
- Look in the **World Outliner** for `PostProcessVolume`
- If one exists, you can use it
- If not, proceed to step 2

### 2. Add Post Process Volume

If a Post Process Volume doesn't exist:

1. In the **Place Actors** panel, search for "Post Process Volume"
2. Drag it into your level
3. Place it anywhere in the level (location doesn't matter if it's unbound)

### 3. Configure the Volume

1. Select your Post Process Volume in the World Outliner
2. In the **Details** panel, configure the following settings:

#### Make it Global (Recommended)

- Check **Infinite Extent (Unbound)**
- This ensures the post processing applies everywhere in your level

#### Alternative: Bounded Volume

If you prefer a bounded volume:
- Leave **Infinite Extent** unchecked
- Scale the volume to cover your playable area
- Adjust the **Blend Radius** and **Blend Weight** as needed

## Post Process Settings

Depending on your needs, you may want to configure:

- **Bloom**: For highlights and glowing effects
- **Ambient Occlusion**: For realistic shadows in crevices
- **Auto Exposure**: For automatic brightness adjustment
- **Color Grading**: For overall visual tone

## Integration with Selection System

The post processing volume works with the selection system to provide:
- Highlight effects on selected objects
- Outline rendering (if configured)
- Enhanced visual feedback

## Troubleshooting

### Effects Not Showing
- Ensure **Infinite Extent** is checked
- Check that the volume is enabled in the World Outliner
- Verify your project's rendering settings support post processing

### Performance Issues
- Consider using a bounded volume instead of infinite extent
- Reduce post process effect quality
- Disable expensive effects like Screen Space Reflections

## Next Steps

- [Selection System Configuration →](./selection-system)
- [Basic Navigation →](./basic-navigation/setup)
- [Advanced Navigation →](./advanced-navigation/setup)
