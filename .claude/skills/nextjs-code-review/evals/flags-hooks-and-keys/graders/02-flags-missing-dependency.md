---
type: llm
focus: trace
weight: 1
---

The review flags that handleSort's useCallback dependency array is missing sortDescending even though the callback body reads it, and explains this can cause a stale closure/stale sort direction.
