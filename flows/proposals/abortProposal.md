```mermaid

flowchart TD
A["Require caller is same as applicant of the proposal"]
B["Require current time is before abortWindow Period"]
C["Emit Abort()"]
A --> B
B --> C

```