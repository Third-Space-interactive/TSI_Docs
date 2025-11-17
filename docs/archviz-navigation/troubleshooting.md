# Troubleshooting

Common issues and solutions for the **UE5 Navigation Template** (Google Earth Style Controls).

---

## Collision Issues

### Falling Through Floor (First Person Mode)

**This is the most common issue users encounter.**

**Symptoms:**

- Player falls infinitely when entering first person mode
- Floor appears to have no collision
- Gravity pulls player down endlessly
- Happens especially with Level Instances or Instanced Static Meshes

![Player falling through floor](/img/archviz-nav/collision-issue.webp)

**Root Cause:**

Instanced Static Meshes and Level Instances often have collision disabled by default. The **Collision Complexity** setting needs to be changed from "Project Default" to "Use Complex Collision As Simple."

**Solution 1: Fix Single Mesh**

For individual problematic meshes:

1. Select the mesh in your level
2. In **Details** panel, click the magnifying glass icon next to **Static Mesh** to browse to the asset
3. Double-click the static mesh to open **Static Mesh Editor**
4. Search for "**collision complexity**"
5. Change **Collision Complexity** from **Project Default** to **Use Complex Collision As Simple**
6. **Save** the asset
7. Return to level and test

![Setting collision complexity on single mesh](/img/archviz-nav/collision-complexity-single.webp)

**Solution 2: Batch Fix Multiple Meshes (Recommended)**

For many meshes - this is the most efficient workflow:

1. Navigate to the folder containing your floor meshes in **Content Browser**
2. Press **Ctrl + A** to select all meshes
3. Right-click → **Asset Actions > Edit Selection in Property Matrix**
4. In **Property Matrix**, click **Pin Columns**
5. Type "**collision complexity**" and press Enter
6. Select all rows (Ctrl + A)
7. In the **Collision Complexity** dropdown at the bottom, select **Use Complex Collision As Simple**
8. Press **Ctrl + S** to save all changes
9. Close Property Matrix

![Batch editing collision complexity for multiple assets](/img/archviz-nav/collision-batch-edit.webp)

> **Pro Tip:** This workflow can fix hundreds of assets in seconds. The example in the video fixed 285 assets at once!

**Verification:**

1. In viewport, enable **Show > Collision > Player Collision**
2. **Blue meshes** = collidable with player
3. **Non-blue meshes** = NOT collidable
4. Ensure floor surfaces appear blue
5. Test in first person mode

![Collision visualization - blue is collidable](/img/archviz-nav/collision-visualization.webp)

After fixing:

![Fixed collision showing blue surfaces](/img/archviz-nav/collision-fixed.webp)

**Performance Note:**

Using "Complex Collision as Simple" increases physics calculation cost. For very large scenes (1000+ objects), consider:

- Using simplified collision meshes instead
- Only applying to critical walkable surfaces
- Using collision LODs for distant objects

---

### Can't Click to Move

**Symptoms:**

- Clicking floor does nothing in first person mode
- Character doesn't move when clicking
- No response to floor clicks

**Solutions:**

1. **Verify FloorPlate collision:**

   - Select floor objects in Outliner
   - Check **Object Type** is set to **FloorPlate**
   - Ensure **Collision Enabled** is **Query and Physics**
   - See [Basic Navigation Setup](./basic-navigation/setup#step-3-assign-floor-collision)

2. **Check collision channels exist:**

   - Open **Edit > Project Settings > Collision**
   - Verify **FloorPlate** object channel exists
   - If missing, create it (see [Basic Navigation Setup](./basic-navigation/setup#step-2-configure-collision-channels))

3. **Test collision visibility:**
   - Enable **Show > Collision** in viewport
   - Floor should have visible collision geometry
   - Look for green or purple wireframes

---

### Objects Not Selectable

**Symptoms:**

- Clicking objects doesn't focus camera
- No highlight when hovering over objects
- Selection system not working

**Solutions:**

1. **Verify SelectableMesh collision:**

   - Select objects in Outliner
   - Set **Collision Presets** to **Custom**
   - Set **Object Type** to **SelectableMesh**
   - See [Basic Navigation Setup](./basic-navigation/setup#step-4-assign-selectable-mesh-collision)

2. **Check post-process material:**

   - Verify **MI_SelectionHighlight** is assigned to Post Process Volume
   - See [Selection System](./selection-system)

3. **Verify collision geometry exists:**
   - Open mesh in Static Mesh Editor
   - Check collision is not empty
   - If missing, generate collision: **Collision > Add Box/Sphere/Capsule Collision**

---

## Camera Issues

### Camera Too Close/Far

**Symptoms:**

- Can't zoom close enough to objects
- Can't zoom far enough to see full scene
- Zoom range feels limited

**Solutions:**

1. **Adjust min/max distances:**

   - Open character blueprint
   - Find **Min Camera Distance** variable
   - Find **Max Camera Distance** variable
   - Adjust to appropriate ranges for your scene

2. **Check SpringArm length:**
   - Select SpringArm component
   - Adjust **Target Arm Length**
   - This sets the default camera distance

---

### Camera Movement Too Fast/Slow

**Symptoms:**

- Camera responds too quickly/slowly to input
- Uncomfortable navigation experience
- Controls feel unresponsive or too sensitive

**Solutions:**

1. **Adjust speed variables:**

   - Open character blueprint
   - Modify **OrbitSpeed**, **PanSpeed**, **ZoomSpeed**
   - Typical range: 0.5 - 2.0

2. **Check input sensitivity:**
   - **Edit > Project Settings > Input**
   - Adjust axis scales for **Turn** and **LookUp**
   - Lower values = slower, more precise
   - Higher values = faster, more responsive

---

## Visual/Material Issues

### No Highlight on Hover

**Symptoms:**

- Objects don't highlight when hovering
- Selection works but no visual feedback
- Outline not visible

**Solutions:**

1. **Verify post-process setup:**

   - Does Post Process Volume exist in level?
   - Is **Infinite Extent (Unbound)** enabled?
   - Is **MI_SelectionHighlight** assigned to Post Process Materials array?

2. **Check material parameters:**

   - Open **MI_SelectionHighlight**
   - **Highlight Color** is not black?
   - **Glow Intensity** > 0?
   - **Line Width** > 0?

3. **Verify anti-aliasing:**

   - **Edit > Project Settings > Rendering**
   - **Anti-Aliasing Method** should be TAA or MSAA
   - Outlines require AA to render properly

4. **Check stencil rendering:**
   - Ensure project supports custom depth/stencil
   - **Project Settings > Rendering > Postprocessing > Custom Depth-Stencil Pass** = Enabled

---

### Highlight Color Wrong

**Symptoms:**

- Highlight is default orange instead of custom color
- Changes to material don't appear in-game
- Color not updating

**Solutions:**

1. **Check correct material instance:**

   - Verify Post Process Volume references your edited material instance
   - Not the parent material **M_SelectionHighlight**
   - Use **MI_SelectionHighlight** (Material Instance)

2. **Save material changes:**

   - Ensure you saved the material instance after editing
   - Try closing and reopening Material Instance Editor
   - Reload level

3. **Force material update:**
   - Remove material from Post Process Volume
   - Save level
   - Re-add material
   - Test again

---

## Input Issues

### Controls Not Working

**Symptoms:**

- Mouse input doesn't move camera
- Keyboard shortcuts don't work
- Touch controls not responding (mobile)
- Nothing happens when clicking

**Solutions:**

1. **Verify game mode:**

   - **Window > World Settings**
   - **Game Mode Override** set to **TSI_Gamemode_Basic** or **TSI_Gamemode_Advanced**?
   - Correct game mode selected?

2. **Check input mappings:**

   - **Character > Inputs > IMC Touch + IMC Desktop**
   - Verify Action/Axis mappings exist for:
     - Touch and Desktop Input Mapping Context
     - You can also change the inputs here
   - Check for conflicting mappings

3. **Player controller:**

   - Ensure correct player controller is being used
   - Check controller isn't disabled in blueprint
   - Verify input mode is set correctly
   - Check that it is being spawned at **Event Begin Play** in your Player Controller (basic or advanced depending on the game mode chosen)

4. **UI blocking input:**
   - Check if UI widget is consuming input
   - Disable UI temporarily to test
   - Verify input mode allows game input

---

## Getting Additional Help

### Documentation Resources

- **Video Tutorial:** Original setup video (linked in template description)
- **Online Docs:** [docs.thirdspaceinteractive.ca](https://docs.thirdspaceinteractive.ca)
- **FAB Product Page:** Check Q&A section for common questions

### Community Support

- **Unreal Forums:** Search for "UE5 Navigation Template, Google Earth Style Controls"
- **FAB Reviews:** Check product reviews for user tips
- **Discord:** Join Third Space Interactive community [Discord Channel](https://discord.gg/8pVjBjCe)

### Reporting Bugs

If you encounter a bug:

1. **Document the issue:**

   - Steps to reproduce
   - Screenshot or video
   - Unreal Engine version
   - Platform (PC/Mobile/Pixel Streaming)

2. **Check if known issue:**

   - Search this troubleshooting page
   - Check FAB product page

3. **Report:**
   - Contact support via FAB Marketplace
   - Provide all documentation from step 1

---

## Preventive Maintenance

### Before Shipping Project

Checklist of items to verify:

- ✅ Test both Basic and Advanced navigation modes
- ✅ Test on target platforms (desktop/mobile/pixel streaming)
- ✅ Verify all floor surfaces have **FloorPlate** collision
- ✅ Verify selectable objects have **SelectableMesh** collision
- ✅ Test selection on all interactive objects
- ✅ Verify first person mode doesn't fall through floor
- ✅ Check camera doesn't clip through walls
- ✅ Test click-to-move on all walkable surfaces
- ✅ Verify highlights appear on hover
- ✅ Check performance with Profiler
- ✅ Test all camera modes and transitions

### Regular Checks During Development

- Test navigation after adding new geometry
- Re-verify collisions after mesh updates
- Check performance after lighting changes
- Test on target devices frequently
- Validate collision channels still exist

---

## Quick Reference: Common Solutions

| Problem                | Quick Fix                                                     |
| ---------------------- | ------------------------------------------------------------- |
| Falling through floor  | Set Collision Complexity to "Use Complex Collision As Simple" |
| Can't click to move    | Assign FloorPlate collision to floor objects                  |
| No selection highlight | Add MI_SelectionHighlight to Post Process Volume              |
| Objects not selectable | Assign SelectableMesh collision to objects                    |
| Camera clipping walls  | Enable Do Collision Test on SpringArm                         |
| Controls not working   | Check Game Mode is set correctly                              |
| Highlight wrong color  | Edit MI_SelectionHighlight material instance                  |
| Low performance        | Reduce selectable objects, optimize collision                 |

---

## Related Pages

- [Basic Navigation Setup →](./basic-navigation/setup) _(Complete setup guide)_
- [Advanced Navigation Setup →](./advanced-navigation/setup) _(Advanced features and collision complexity)_
- [Selection System →](./selection-system) _(Selection and highlight setup)_
