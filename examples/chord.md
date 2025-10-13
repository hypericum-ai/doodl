- Separate chords and labels, inline:

<chord
  data='[
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]
  ]'
  labels='["black", "blond", "brunette", "redhead"]'
  colors='["black", "#ffdd89", "#957244", "#f26223"]'>
</chord>

- Or from a file (e.g. `example.json`) that contains:

```json
[
  [11975,  5871, 8916, 2868],
  [ 1951, 10048, 2060, 6171],
  [ 8010, 16145, 8090, 8045],
  [ 1013,   990,  940, 6907]
]
```

<chord
  path='data/chord-example.json'
  labels='["black", "blond", "brunette", "redhead"]'
  colors='["black", "#ffdd89", "#957244", "#f26223"]'>
</chord>

- Single dictionary argument with both chords and labels:

<chord
  data='{
    "chords": [
      [11975,  5871, 8916, 2868],
      [ 1951, 10048, 2060, 6171],
      [ 8010, 16145, 8090, 8045],
      [ 1013,   990,  940, 6907]
    ],
    "labels": [
      "black", "blond", "brunette", "redhead"
    ]
  }'
  colors='["black", "#ffdd89", "#957244", "#f26223"]'>
</chord>

- Single dictionary argument with chords only:

<chord
  data='{
    "chords": [
      [11975,  5871, 8916, 2868],
      [ 1951, 10048, 2060, 6171],
      [ 8010, 16145, 8090, 8045],
      [ 1013,   990,  940, 6907]
    ]
  }'
  colors='["black", "#ffdd89", "#957244", "#f26223"]'>
</chord>
