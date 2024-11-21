"use client"
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import CourseAction from './CourseAction'
import { AllCourseType } from '@/types'

const CourseTable = ({ fetchedData }: {
    fetchedData: AllCourseType[]
}) => {
    const [data, setData] = React.useState(fetchedData)

    const removeCourse = (courseid: string) => {
        setData(data.filter(course => course.id !== courseid))
    }

    return (
        <TableBody>
            {
                data.map((course, index) => (
                    <TableRow key={course.id}>
                        <TableCell>{course.id}</TableCell>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>{course.created_at}</TableCell>
                        <TableCell>{course.duration}</TableCell>
                        <TableCell>{course.price}</TableCell>
                        <TableCell>{course.offer}</TableCell>
                        <TableCell>{course.status}</TableCell>
                        <TableCell>
                            <CourseAction courseid={course.id} index={index} removeCourse={removeCourse} />
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    )
}

export default CourseTable
