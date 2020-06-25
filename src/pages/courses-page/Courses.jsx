import React, { useState, useEffect } from "react";
import "./Courses.scss";
// import CourseInformation from '../../component/course-information/CourseInformation'
import CourseInformation from "../../component/course-information/CourseInformation"
import CourseSelector from "../../component/course-selector/CourseSelector";
import CourseCalender from "../../component/course-calender/CourseCalender";
import DateBar from "../../component/date-bar/date-bar"


function Courses(props) {

  const [allCourses, setAllCourses] = useState([])
  const [choose, setChoose] = useState([])
  const [newCourses, setNewCourses] = useState([])
  const [newCategory, setNewCategory] = useState([])
  const [coaches, setCoaches] = useState([])
  const [week, setWeek] = useState('')
  // console.log('app.js',newCourses)

  async function getCoursesData() {
    // 開啟載入指
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request('http://localhost:5000/api/courses/data', {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()

    setAllCourses(data)
    setWeek(data)
    // setChoose(data)
    // console.log(data)
  }
  async function getCoachesData() {
    const request = new Request('http://localhost:5000/api/employee', {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    
    // console.log(data)
    // 設定資料
    setCoaches(data)
  }

  // console.log('introduce:'+introduce)
  async function getCategoryData() {
    // 開啟載入指示
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request('http://localhost:5000/api/category', {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()

    // console.log(data)
    // 設定資料
    setChoose(data)
  }

  useEffect(() => {
    getCoursesData()
    getCoachesData()
    getCategoryData()
  }, [])

  useEffect(() => {
    handleChange({ target: { value: '有氧教室' } })
  }, [choose])

  const handleChange = (e) => {

    const oop = e.target.value
    const renewCourses = allCourses.coursesRow && allCourses.coursesRow.filter(course => (course.courseCategoryName === oop))

    setNewCourses(renewCourses)
    setNewCategory(oop)

    // console.log('aa',{ ...choose })
    if (!allCourses.coursesRow) {
      const aa = { ...choose }
      setChoose(aa)
    }
  }

  return (
    <>
      <div className="banner">
        {/* <img  alt="logo" src={logo} /> */}
        <h1>課程資訊 Class information</h1>
      </div>
      <div className="container">
        <CourseInformation
          choose={choose}
          newCourses={newCourses}
          newCategory={newCategory}
        />
        <CourseSelector
          choose={choose}
          setChoose={setChoose}
          allCourses={allCourses}
          setAllCourses={setAllCourses}
          handleChange={handleChange}
        />
        <DateBar 
          allCourses={allCourses}
          week={setWeek}
        />
        <CourseCalender
          choose={choose}
          setChoose={setChoose}
          allCourses={allCourses}
          setAllCourses={setAllCourses}
          newCourses={newCourses}
          coaches={coaches}
          setCoaches={setCoaches}
        />
      </div>
    </>
  );
}
export default Courses;