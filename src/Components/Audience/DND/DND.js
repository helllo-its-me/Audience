import React, { useEffect, useState, memo } from 'react'
import { INITIAL_CELLS, RESET_CELLS } from '../../../redux/types'
import { useSelector, useDispatch } from 'react-redux'
import Masonry from 'react-masonry-component'
import Tree from '../../Tree/tree'
import Cell from './Cell/cell'
import AddCellButton from './Cell/addCellButton'
import './DND.css'

function DND({ filter }) {
  const [inCell, setInCell] = useState([])
  const dispatch = useDispatch()
  const tree = useSelector((state) => state.tree.tree.data)
  const disabled = useSelector((state) => state.audience.disabled)
  const newStateAudience = useSelector(
    (state) => state.audience.newStateAudience
  )
  const cells = useSelector((state) => state.cells.cells)

  useEffect(() => {
    let newInCell = Object.values(cells)
      .map((el) => el.data)
      .map((el) => el)
    setInCell([].concat(...newInCell))
  }, [cells])

  // инициализирует изначальное состояние ячеек (cells)
  function initionCells(data) {
    dispatch({ type: RESET_CELLS })

    const arr = newStateAudience.expression.innerExpressions

    for (let i = 0; i < arr.length; i++) {
      let arrElem = []
      currentItem = ''

      arr[i].data.map((el) => {
        let obj = searchObj(data, el.id, el.type)
        return obj !== undefined && arrElem.push(obj)
      })
      dispatch({
        type: INITIAL_CELLS,
        payload: {
          data: arrElem,
          type: arr[i].type,
          name: arr[i].name
            ? arr[i].name
            : arr[i].type === 0
            ? 'Union block'
            : '',
        },
      })
    }
  }
  useEffect(() => {
    tree && initionCells(tree)
  }, [newStateAudience.expression, tree])

  // ищет объект в переданном массиве объектов (дата) по ид.
  let currentItem

  function searchObj(data, id, type) {
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].id == id &&
        ((type === 1 && data[i].parentCategoryId) ||
          (type === 0 && data[i].categoryId))
      ) {
        currentItem = data[i]

        break
      }

      if (data[i].segments) {
        searchObj(data[i].segments, id, type)
      }
      if (data[i].nestedCategories) {
        searchObj(data[i].nestedCategories, id, type)
      }
    }
    return currentItem
  }

  return (
    <div className='dnd'>
      <div className='dnd-container'>
        <div className='tree tree-audiences'>
          {tree && tree.length ? (
            <Tree
              data={tree}
              incell={inCell}
              filter={filter}
              disabled={disabled}
            />
          ) : null}
        </div>
        <div className='dnd-container-for-cells'>
          <div className='intersection-block'>
            <Masonry className='my-gallery-class cells'>
              {Object.keys(cells) &&
                Object.keys(cells).map((el, ind) =>
                  cells[el].type === 0 ? (
                    <Cell
                      key={ind}
                      incell={inCell}
                      type={cells[el].type}
                      name={cells[el].name ? cells[el].name : ''}
                      ind={el}
                      itm={cells[el].data}
                    />
                  ) : null
                )}
              <AddCellButton />
            </Masonry>
          </div>
          <div className='dnd-container-for-difference'>
            <div className='container-for-difference-header'>
              <h6>Difference block</h6>
            </div>
            <div className='cells difference difference-block'>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                }}>
                {Object.keys(cells) &&
                  Object.keys(cells).map((el, ind) =>
                    cells[el].type === 1 ? (
                      <div id={el} key={ind} className='celldiv'>
                        <Cell
                          incell={inCell}
                          key={ind}
                          ind={el}
                          itm={cells[el].data}
                          type={cells[el].type}
                          name={cells[el].name ? cells[el].name : ''}
                        />
                      </div>
                    ) : null
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(DND)
