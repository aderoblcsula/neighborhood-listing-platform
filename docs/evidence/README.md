# Data Contract Lab Evidence

All screenshots use fictional listing data. Browser account details and local
terminal identity/path information were excluded through cropping.

| File | Evidence demonstrated |
| --- | --- |
| `01-ai-studio-settings.png` | Gemini model, temperature, structured output enabled, and optional tools disabled. |
| `02-ai-studio-schema.png` | OpenAPI-style schema entered in AI Studio Structured outputs. |
| `03-ai-studio-generated-json.png` | Five-record synthetic JSON response produced by AI Studio. |
| `04-validator-first-failure.png` | Raw generated IDs rejected by the local strict validator. |
| `05-validator-regenerated-pass.png` | Regenerated five-record dataset passes local validation. |
| `06-contract-tests-pass.png` | Three test files and eight tests pass, including safe failure. |
| `07-production-build-pass.png` | Next.js optimized production build succeeds. |
| `08-validated-ui.png` | Validated property and sponsor data rendered in the Week 2 interface. |

The text evidence in `docs/validation-first-run.txt`,
`docs/validation-regenerated-run.txt`, and `docs/test-output.txt` remains the
authoritative, searchable command output.
