## Using "sets"

<vennchart
    data='[
        { "sets": ["A"], "size": 12 }, 
        { "sets": ["B"], "size": 12 },
        { "sets": ["C"], "size": 12 },
        { "sets": ["A","B"], "size": 2 },
        { "sets": ["A","C"], "size": 3 },
        { "sets": ["B","C"], "size": 4 },
        { "sets": ["A","B","C"], "size": 1 }
    ]'
    width=500
    height=500
>
</vennchart>

## Using "name"

<vennchart
    data='[
        { "name": "A", "size": 12 }, 
        { "name": "B", "size": 12 },
        { "name": "C", "size": 12 },
        { "name": "A&B", "size": 2 },
        { "name": "A&C", "size": 3 },
        { "name": "B&C", "size": 4 },
        { "name": "A&B&C", "size": 1 }
    ]'
    width=500
    height=500
>

## Using both, mixed

<vennchart
    data='[
        { "name": "A", "size": 12 }, 
        { "name": "B", "size": 12 },
        { "name": "C", "size": 12 },
        { "name": "A&B", "size": 2 },
        { "name": "A&C", "size": 3 },
        { "sets": ["B","C"], "size": 4 },
        { "sets": ["A","B","C"], "size": 1 }
    ]'
    width=500
    height=500
>
