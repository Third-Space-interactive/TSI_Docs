# Advanced Navigation Setup

Perfect for larger scale projects like neighbourhood or city explorers. The navigation is built to feel like Google Earth's navigation and is much more of a "free roam" or explore type.

## Installation

1. Open your Unreal Engine project
2. Navigate to **Window > World Settings**
3. Set your **Game Mode** to `TSI_Gamemode_Advanced`

This will automatically configure:
- Appropriate player character
- Player controller
- HUD class for advanced navigation

## How It Works

The advanced navigation system uses a unique anchor-based approach:

- The **pawn and camera** are always in the same location
- The player moves **relative to an anchor point** (`BP_NavAnchor`)
- The anchor **dynamically updates** its position under the cursor
- This creates a Google Earth-style exploration experience

## Anchor System

The `BP_NavAnchor` blueprint provides:
- Dynamic position updates
- Cursor-relative movement
- Smooth exploration controls
- Large-scale environment support

## Key Differences from Basic

| Feature | Basic Navigation | Advanced Navigation |
|---------|-----------------|---------------------|
| Best For | Single objects/buildings | Neighborhoods/cities |
| Camera System | Spring arm | Fixed camera with anchor |
| Movement Style | Center-focused orbit | Free roam exploration |
| Scale | Small to medium | Large environments |

## Next Steps

- [Selection System Setup →](../selection-system)
- [Post Processing Setup →](../post-processing-setup)
- [Basic Navigation →](../basic-navigation/setup)
