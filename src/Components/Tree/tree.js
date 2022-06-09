import React, { memo } from 'react'
import Element from '../Element/Element'
import './tree.css'

const Tree = ({
  data,
  incell,
  onClick,
  filter,
  filterId,
  toMakeElementVisible,
  editSegment,
  paddingLeft,
  disabled,
  moveFolder,
  location,
  colorElement,
}) => {
  return (
    <ul className='folder'>
      {data &&
        data
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => (
            <Element
              data={item}
              key={item.id}
              incell={incell && incell}
              onClick={onClick}
              filter={filter && filter}
              filterId={filterId && filterId}
              toMakeElementVisible={toMakeElementVisible}
              editSegment={editSegment && editSegment}
              paddingLeft={paddingLeft && paddingLeft}
              disabled={disabled}
              moveFolder={moveFolder}
              location={location}
              colorElement={colorElement}
            />
          ))}
    </ul>
  )
}

export default memo(Tree)
