const colors = [
    '#fb4764',
    '#ff684e',
    '#ff9232',
    '#ffd708',
    '#ffec01',
    '#e8ec0a',
    '#c1e420',
    '#90d240',
    '#64bf5d',
    '#30a980'
]

export function getColor(scoreValue:undefined | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10) {
    if (scoreValue === undefined) {
        return 'lightgrey';
    } else {
        return colors[scoreValue - 1];
    }
}


export function getColorForeground(scoreValue:undefined | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10) {
    return '#000000B0';
}