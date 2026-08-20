# Decision system

## Lenses

- **Balanced** combines growth, risk, security and verification.
- **Growth** weights growth and hiring momentum more heavily.
- **Risk-adjusted** rewards lower composite risk and stronger security posture.
- **Security** emphasizes security rating, MFA coverage and open findings.

All scores are normalized to 0–100 and implemented as pure deterministic functions so they can be unit-tested independently from rendering.

## Segments

The workbench supports all companies, verified records, enterprise-tagged companies and scale-ups. Segment selection is treated as product context, not hidden filtering.

## Saved views

Lens + segment are persisted locally in the portfolio demo. This demonstrates repeat research context while keeping the reference implementation deterministic and privacy-minimal.

## Measurement

Typed analytics capture lens changes, segment changes, saved decision views and experiment review. The intent is to measure decision behavior rather than generic page traffic.
