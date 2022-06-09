import { useState, useEffect, useMemo, memo } from 'react'
import Button from './Button/Button'
import Tree from '../Tree/tree'
import categoryPic from '../../Pic/categoryPic.svg'
import segmentPic from '../../Pic/segmentPic.svg'

const Element = (props) => {
  const [expand, setExpand] = useState(false)
  const [display, setDisplay] = useState('none')
  const [filterVisible, setFilterVisible] = useState('flex')
  const [angle, setAngle] = useState(-90)
  const [paddingLeft, setPaddingLeft] = useState(-20)

  // срабатывает при нажатии стрелки на папке (показывает и скрывает элементы находящиеся в ней)
  const clickExpand = () => {
    if (expand === true) {
      setExpand(false)
      setDisplay('none')
      setAngle(-90)
    } else {
      setExpand(true)
      setDisplay('')
      setAngle(0)
    }
  }

  // срабатывает как только элемент начинает перетаскиваться
  const dragStartHandler = (e) => {
    e.dataTransfer.setData('data', JSON.stringify(props.data))
  }

  // элемент покидает зону
  const dragLeaveHandler = (e) => {}

  // срабатывает при отпускании элемента
  const dragEndHandler = (e) => {}
  // делает бэкграунд и скрывает папки в зависимости от условий
  const chipsStyle = useMemo(() => {
    if (props.moveFolder)
      if (
        props.moveFolder.name === props.data.name &&
        props.moveFolder.id === props.data.id
      ) {
        return { display: 'none' }
      }

    if (props.data.name === 'Корень' && props.data.id === -1) {
      return { display: 'none' }
    }

    if (props.editSegment) {
      if (
        props.editSegment.name === props.data.name &&
        props.editSegment.id === props.data.id
      ) {
        return {
          background: 'rgba(108, 172, 219, 0.2)',
          display: filterVisible,
        }
      }
    }
    if (props.colorElement === props.data.name) {
      return {
        background: 'rgba(206, 202, 255, 0.44)',
        display: 'flex',
      }
    }

    if (props.incell) {
      if (
        props.incell.some(
          (elem) => elem.name === props.data.name && elem.id === props.data.id
        )
      ) {
        return {
          background: 'rgba(108, 172, 219, 0.2)',
          display: filterVisible,
        }
      }
    }

    return {
      display: filterVisible,
    }
  }, [props, filterVisible])

  useEffect(() => {
    filterItems()
  }, [props.filter, props.filterId, props.data])

  // показывает все эелементы вверх по дереву
  useEffect(() => {
    if (filterVisible === 'flex' && props.filter) {
      props.toMakeElementVisible && props.toMakeElementVisible()
    }
  })
  // устанавливает отступы внутри дивов
  useEffect(() => {
    if (props.data.parentCategoryId && props.paddingLeft) {
      setPaddingLeft(Number(`${props.paddingLeft + 25}`))
    } else if (props.data.categoryId && props.paddingLeft) {
      if (!props.location) {
        setPaddingLeft(Number(`${props.paddingLeft + 50}`))
      } else {
        setPaddingLeft(Number(`${props.paddingLeft + 25}`))
      }
    }
  }, [
    props.data.categoryId,
    props.data.parentCategoryId,
    props.location,
    props.paddingLeft,
  ])

  // фильтрует дерево
  function filterItems() {
    if (!props.filter) {
      setFilterVisible('flex')
      return
    }

    if (props.filterId) {
      props.data.name &&
      props.data.name.toLowerCase().includes(props.filter.toLowerCase())
        ? props.data.id == props.filterId
          ? setFilterVisible('flex')
          : setFilterVisible('none')
        : setFilterVisible('none')
    } else {
      props.data.name &&
      props.data.name.toLowerCase().includes(props.filter.toLowerCase())
        ? setFilterVisible('flex')
        : setFilterVisible('none')
    }

    setExpand(true)
    setDisplay('')
    setAngle(0)
  }

  // делает элемент видимым в отфильтрованном дереве
  function toMakeElementVisible() {
    setFilterVisible('flex')
  }

  return (
    <li
      className={
        props.data.name !== 'Корень'
          ? props.data.parentCategoryId
            ? props.filter && props.filter === props.data.name
              ? 'category_fold js-card filter_itm'
              : 'category_fold js-card'
            : props.filter && props.filter === props.data.name
            ? 'js-card segment_fold filter_itm'
            : 'js-card segment_fold'
          : ''
      }
      id={props.data.id}
      name={props.data.name}
      style={
        filterVisible === 'flex' ? { display: '' } : { display: filterVisible }
      }>
      <div
        onClick={props.onClick ? (e) => props.onClick(e, props.data) : null}
        className='element'
        style={chipsStyle}
        draggable={!props.disabled}
        onDragStart={dragStartHandler}
        onDragLeave={dragLeaveHandler}
        onDragEnd={dragEndHandler}>
        <div
          style={{
            paddingLeft: `${paddingLeft}px`,
            alignSelf: 'center',
          }}>
          {props.data.parentCategoryId ? (
            <div style={{ display: 'flex' }}>
              <Button
                onClick={clickExpand}
                style={{
                  transform: `rotate(${angle}deg)`,
                  marginRight: '5px',
                }}
              />
              <img src={categoryPic} alt='category' />
              <h6 style={{ fontWeight: '400', marginBottom: 0 }}>
                {props.data.name}
              </h6>
            </div>
          ) : (
            <div style={{ display: 'flex' }}>
              <img src={segmentPic} alt='segment' />
              <h6 style={{ fontWeight: '400', marginBottom: 0 }}>
                {props.data.name}
              </h6>
            </div>
          )}
        </div>
        <small
          className='rightside'
          style={{ fontWeight: '400', paddingTop: 0, alignItems: 'center' }}>
          reach: {props.data.size.toLocaleString('ru')}
        </small>
      </div>

      {props.data.segments && (
        <div
          style={{ display: props.data.name === 'Корень' ? '' : `${display}` }}
          className='folder'>
          {props.data.nestedCategories && (
            <Tree
              data={props.data.nestedCategories}
              incell={props.incell && props.incell}
              filter={props.filter && props.filter}
              filterId={props.filterId && props.filterId}
              toMakeElementVisible={toMakeElementVisible}
              editSegment={props.editSegment && props.editSegment}
              onClick={props.onClick}
              paddingLeft={paddingLeft}
              disabled={props.disabled}
              moveFolder={props.moveFolder}
              location={props.location}
              colorElement={props.colorElement}
            />
          )}
          <Tree
            data={props.data.segments}
            incell={props.incell && props.incell}
            filter={props.filter && props.filter}
            filterId={props.filterId && props.filterId}
            toMakeElementVisible={toMakeElementVisible}
            onClick={props.onClick}
            editSegment={props.editSegment && props.editSegment}
            paddingLeft={paddingLeft}
            disabled={props.disabled}
            moveFolder={props.moveFolder}
            location={props.location}
            colorElement={props.colorElement}
          />
        </div>
      )}
    </li>
  )
}

export default memo(Element)
