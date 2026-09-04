# Roadbook Export Contract V0.1

## Input

```json
{
  "requested_formats": ["html", "pdf"],
  "output_directory": null,
  "trip_state": {},
  "image_policy": "licensed_local_if_available",
  "allow_provisional": false
}
```

## Output

```json
{
  "status": "generated",
  "artifact_status": "final",
  "files": [],
  "included_day_ids": [],
  "open_completion_items": [],
  "unverified_items": [],
  "image_results": [],
  "next_actions": []
}
```

`artifact_status` is `final` only when blocking completion items are resolved. Otherwise use `provisional` and make the label visible inside every format.

Do not pass the transcript to the renderer. Use canonical Trip State only.
