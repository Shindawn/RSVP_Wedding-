import re

# Read the CSS file
with open('src/index.css', 'r') as f:
    content = f.read()

# Define all color replacements
replacements = {
    '#8291a0': '#5F7F8F',      # muted grey
    '#75879a': '#5F7F8F',      # caption grey
    '#6587a9': '#315D6B',      # blue icon
    '#71808b': '#5F7F8F',      # info grey
    '#4f6d89': '#315D6B',      # dress eyebrow
    '#7f8b91': '#5F7F8F',      # tiny note grey
    '#bcd5e1': '#EDF8FC',      # hover light
    '#cce0e8': '#EDF8FC',      # button hover
    '#bdced7': '#FFFFFF',      # rsvp card copy
    '#9db3c0': '#FFFFFF',      # footer text
    '#9ca8af': '#5F7F8F',      # optional text
    '#eff3f1': '#EDF8FC',      # entourage bg
    '#eef3f3': '#EDF8FC',      # gallery section
    '#b8cbd4': '#EDF8FC',      # gallery carousel
    '#c8dce4': '#EDF8FC',      # rsvp section bg
    '#284c6a': '#315D6B',      # button hover dark
    '#d5e4ec': '#D9F0F7',      # swatch ice
    '#a5c2d6': '#EDF8FC',      # swatch dusty
    '#172f48': '#315D6B',      # swatch navy
    '#babfc1': '#D9F0F7',      # swatch silver
    '#d8c2a7': '#EDF8FC',      # swatch champagne
}

# Apply replacements
for old, new in replacements.items():
    content = content.replace(old, new)

# Write back
with open('src/index.css', 'w') as f:
    f.write(content)

print('All color replacements completed successfully!')
