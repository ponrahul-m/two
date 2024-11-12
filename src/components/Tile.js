import React from 'react'

const TileView = ({tile}) => {
  var tile = tile;
  var classArray = ['tile'];
  classArray.push('tile' + tile.value);
  if (!tile.mergedInto) {
    classArray.push('position_' + tile.row + '_' + tile.column);
  }
  if (tile.mergedInto) {
    classArray.push('merged');
  }
  if (tile.isNew()) {
    classArray.push('new');
  }
  if (tile.hasMoved()) {
    classArray.push('row_from_' + tile.fromRow() + '_to_' + tile.toRow());
    classArray.push('column_from_' + tile.fromColumn() + '_to_' + tile.toColumn());
    classArray.push('isMoving');
  }
  var classes = classArray.join(' ');
  return (
    <span className={classes} loading="lazy"></span>
  );
}

export default TileView
