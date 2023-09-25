'use client'

import Image from 'next/image'
import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import './index.scss'

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Walmart",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Indigo",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Designing Data Intensive Applications",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Lowes",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
    ],
    tint: 3,
  },
]

const Page = () => {
  const [stores, setStores] = useState(DATA)

  const handleDragDrop = (result) => {
    console.log(result)
    const { destination, source, type } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && source.index === destination.index) return

    if (type === 'group') {
      const reOrderedStore = [...stores]

      const sourceIndex = source.index
      const destinationIndex = destination.index

      const [removedItem] = reOrderedStore.splice(sourceIndex, 1)

      reOrderedStore.splice(destinationIndex, 0, removedItem)

      return setStores(reOrderedStore)
    }

    const itemSourceIndex = source.index
    const itemDestinationIndex = destination.index

    const storeSourceIndex = stores.findIndex(
      (store) => store.id === source.droppableId
    )
    const storeDestinationIndex = stores.findIndex(
      (store) => store.id === destination.droppableId
    )

    const newSourceItems = [...stores[storeSourceIndex].items]
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].items]
        : newSourceItems

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1)
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem)

    const newStores = [...stores]

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      items: newSourceItems,
    }
    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      items: newDestinationItems,
    }

    setStores(newStores)
  }

  return (
    <div className="layout__wrapper">
      <div className='card'>
        <DragDropContext onDragEnd={handleDragDrop}>
          <div className='header'>
            <h1>Shopping List</h1>
          </div>

          <Droppable droppableId='ROOT' type='group'>
            {(provided) => {
              return (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {stores.map((store, index) => (
                    <Draggable key={store.id} className='store-container' draggableId={store.id} index={index}>
                      {(provided) => {
                        return (
                          <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                            <StoreList {...store} />
                          </div>
                        )
                      }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}

export default Page

function StoreList({ name, items, id }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="store-container">
            <h3>{name}</h3>
          </div>
          <div className="items-container">
            {items.map((item, index) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <div
                    className="item-container"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <h4>{item.name}</h4>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  )
}