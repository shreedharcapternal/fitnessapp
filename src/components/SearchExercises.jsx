import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { exerciseOptions, fetchData } from '../utils/fetchData'
import HorizontalScrollbar from './HorizontalScrollbar'


const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {

  const [search,setSearch] = useState('')

  const [bodyParts,setBodyParts] = useState([])
  console.table(bodyParts)

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList',exerciseOptions)
      setBodyParts(['all',...bodyPartsData])
    }
    
    fetchExercisesData();

  },[])



  //console.table(exercises)


  const handleSearch = async() => {
      if(search) {
        const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises',exerciseOptions);
        const searchedExercises = exerciseData.filter((exercise) => exercise.name.toLowerCase().includes(search)
                                  || exercise.target.toLowerCase().includes(search)
                                  || exercise.equipment.toLowerCase().includes(search)
                                  || exercise.bodyPart.toLowerCase().includes(search)) 
        setSearch('')
        setExercises(searchedExercises)
               
      }
  }

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography fontWeight={700} sx={{
        fontSize: { lg: '44px', xs: '30px' }
      }}>
        Awesome Exercises you <br/> 
        should know 
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: { lg: '1170px', xs: '350px' }, backgroundColor: '#fff', borderRadius: '40px' }}
          value={search}
          onChange={(e) => {setSearch(e.target.value.toLowerCase())}}
          placeholder="Search Exercises"
          type="text"
        />
        <Button onClick={handleSearch} className="search-btn" sx={{ bgcolor: '#FF2625', color: '#fff', textTransform: 'none', width: { lg: '173px', xs: '80px' }, height: '56px', position: 'absolute', right: '0px', fontSize: { lg: '20px', xs: '14px' } }}>
          Search
      </Button>      
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
          <HorizontalScrollbar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} />
      </Box>
    </Stack>
  )
}

export default SearchExercises