'use client'
import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function Home() {
  const styles = {
    customer: {
      tableHeader: `w-[33%]`
    }
  }

  return (
    <main className="p-24 space-y-24">
      <DragDropContext>
        <Table className='border'>
          <TableCaption className='text-[2rem] mb-8 font-semibold'>Customer Data</TableCaption>
          <TableHeader className='w-full text-[1.6rem] font-semibold tableHeader'>
            <TableRow className=''>
              <TableHead >Customer No</TableHead>
              <TableHead > Name</TableHead>
              <TableHead >Pickup Location</TableHead>
              <TableHead>Dropoff Location</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            <CustomerInfo />
            <CustomerInfo />
            <CustomerInfo />
          </TableBody>

        </Table>

        <section className="w-full border p-12">
          <Planner />
        </section>
      </DragDropContext>
    </main>
  )
}

const CustomerInfo = ({ customerId, name, pickupLocation, dropOffLocation }) => {
  return (
    <Draggable key={1} className='store-container' draggableId={1} index={2}>
      {(provided) => {
        return (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <TableRow className="text-[1.4rem] font-medium py-3" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
              <TableCell className='py-3'>111</TableCell>
              <TableCell>David</TableCell>
              <TableCell>2, adisa street matogun ogun state</TableCell>
              <TableCell>1a 2nd street ikoyi lagos state</TableCell>
            </TableRow>
          </div>
        )
      }}
    </Draggable>
  )
}


const Planner = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 font-semibold">
        <p></p>
        <Droppable droppableId='ROOT1' type='group1'>
          {(provided) => {
            return (
              <p> Slot 1 </p>
            )
          }}
        </Droppable>
        {/* <Droppable droppableId='ROOT1' type='group1'>Slot 2</Droppable> */}
        {/* <Droppable droppableId='ROOT1' type='group1'>Slot 3</Droppable>
        <Droppable droppableId='ROOT1' type='group1'>Slot 4</Droppable> */}
      </div>

      <div className="grid grid-rows-6 gap-8 font-semibold">
        <p className="border p-8">Day 1</p>
        <p className="border p-8"> Day 2</p>
        <p className="border p-8">Day 3</p>
        <p className="border p-8">Day 4</p>
        <p className="border p-8">Day 5</p>
        <p className="border p-8">Day 6</p>
        <p className="border p-8">Day 7</p>
      </div>
    </div>
  )
}

/**
 * 
 *  <Table>
      <TableHeader className='text-[1.4rem] font-medium'>
        <TableRow className=''>
          <TableHead>Slot</TableHead>
          <TableHead>Date 1</TableHead>
          <TableHead>Date 2</TableHead>
          <TableHead>Date 3</TableHead>
          <TableHead>Date 4</TableHead>
          <TableHead>Date 5</TableHead>
          <TableHead>Date 6</TableHead>
          <TableHead>Date 7</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>111</TableRow>
      </TableBody>
    </Table>
 */