import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ArrowTop from "../assets/png/Arrow_Top.png";
import Select from 'react-select'
import { useMediaQuery } from "react-responsive";
// prettier-ignore
import { 
  Typography,
  Box,
  Grid,
  Button
} from "@mui/material";
// prettier-ignore
import themeConstants from "../components/theme";
import Cookies from 'js-cookie'
import Modal from "../components/modal";
import ProgressLoader from "../components/progressLoader";

const ReadBiblePage = (props) => {
  const {reactSelectStyles} = props;
  const defaultErrMessage = "Some error occurred, Please try again later";
  const [index, setIndex] = useState([]);
  const [bookName, setBookName] = useState(null);
  const [chapterNo, setChapterNo] = useState(null);
  const [allVerse, setAllVerse] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const closeModal = () => setOpenModal(false);
  const setToasterError = (errMessage = defaultErrMessage) => toast.error(errMessage ) 
  const isMobile = useMediaQuery({ maxWidth: "600px" });
  const lastVisitedData = Cookies.get("last_visited_data");
  const prevScrollPos = Cookies.get("last_scroll_pos");
  const [loading, setLoading] = useState(true);

  // This method sets all values
  // From previous visit to the site
  // When 'YES' is clicked from Modal
  const setLastVisited = () => {
    // Extract Bookname and ChapterNo from Cookie
    const [prevBookName, prevChapterNo] = lastVisitedData.split("|");
    // Set Bookname
    setBookName(prevBookName);
    // Set ChapterNo
    setChapterNo(prevChapterNo);
    // Close Modal
    closeModal();
  }

  // This method is called on 'scroll' event
  // It extracts Y-axis scroll position
  // And saves it in Cookie
  const onScroll = () => {
    // Get current scroll position (Y axis)
    const currScrollPos = window.scrollY;
    // Save current scroll position in Cookie
    Cookies.set('last_scroll_pos', currScrollPos);
  };

  // It gets the Bible Index which contains all book names
  // This is used to set the  first select options
  useEffect(()=> {
    if(lastVisitedData) setOpenModal(true);
    axios.get("get-index")
    .then(res=> {
      // Set Bible index
      setIndex(res.data)
    })
    .catch(err=>{
      // Error is console logged & toaster is displayed
      console.log(err);
      setToasterError();
    })
    .finally(() => setLoading(false));

    // Add event listener for 'scroll'
    window.addEventListener("scroll", onScroll);
    // Remove 'scroll' event listener on unmount
    return () => window.removeEventListener("scroll", onScroll);
  },[])


  // API call when chapterNo is changed
  // To get chapter text
  useEffect(()=> {
    if(chapterNo){
      setLoading(true);
      // Save last searched bookName & chapterNo in Cookie
      Cookies.set('last_visited_data', `${bookName}|${chapterNo}`)
      // API call to get chapter text
      axios.get(`get-chapter?book_name=${bookName?.split(",")[0]}&chapter_no=${chapterNo}`)
      .then(res=> {
        setAllVerse(res.data);
        // After 300ms we scroll to previous scroll position
        // This is done to pevent no data and scroll won't work
        setTimeout(()=>window.scrollTo(0, prevScrollPos), 300);
      })
      .catch(err=> {
        // Error is console logged & toaster is displayed
        console.log(err);
        setToasterError();
      })
      .finally(() => setLoading(false));
    }
  },[chapterNo])

  // Modal set when user revisits the site
  const ModalContent = [
    <Fragment>
      <Typography textAlign="center" fontSize={themeConstants.QUATERNARY_FSZ} variant="body1">
        Want to continue where you left ?
      </Typography>
      <Box marginTop="40px">
        <Button
          onClick={closeModal}
          variant="contained"
          color="secondary"
          width="100px"
          disableElevation
          sx={{
            marginRight: "20px",
            minWidth: "100px",
          }}>
          No
        </Button>

        <Button
          onClick={setLastVisited}
          variant="contained"
          color="primary"
          disableElevation
          sx={{
            minWidth: "100px",
          }}>
          Yes
        </Button>
      </Box>
    </Fragment>
  ]

  if (loading) return <ProgressLoader />

  return (
    <Fragment>

      {/* MODAL CONTENT */}
      <Modal
        isOpen={openModal}
        setClose={closeModal}
        content={ModalContent}/>
      {/* MODAL CONTENT */}

      <Grid 
        container
        spacing={3}
        sx={{
          padding:  themeConstants[isMobile ? "SECONDARY_PDD" : "PRIMARY_PDD"],
          cursor: "default"
        }}>
        <Grid item md={6} xs={12}>
          <Typography
            variant="body1"
            fontSize={themeConstants.QUINARY_FSZ}
            marginBottom="10px">
            Select Book:
          </Typography>

          <Select
            value={bookName ? {value: bookName, label: bookName.split(",")[0]} : null}
            placeholder="Select Book"
            options={
              index?.map(item=>{
                return {value: `${item.book_name},${item.chapter_range}`, label: item.book_name}
              })
            }
            onChange={({value}) => {setBookName(value); setChapterNo(null)}}
            styles={reactSelectStyles}
          />
        </Grid>
        
        <Grid item md={6} xs={12}>
          {
            bookName ? (
            <Fragment>
              <Typography 
                variant="body1"
                fontSize={themeConstants.QUINARY_FSZ}
                marginBottom="10px">
                Select Chapter:
              </Typography>

              <Select
                value={chapterNo ? {value: chapterNo, label: `Chapter ${chapterNo}`} : null}
                placeholder="Select Chapter No"
                options={
                  Array.from({length: bookName.split(",")[1].split("-")[1]}, (x, i)=>{
                    return {value: i+1, label: `Chapter ${i+1}`}
                  })
                }
                onChange={({value})=> setChapterNo(value)}
                styles={reactSelectStyles}
              />
            </Fragment>
            ): null
          }
        </Grid>

        <Grid item 
          sx={{
            marginTop: themeConstants[isMobile ? "QUATERNARY_MRG" : "TERNARY_MRG"],
            marginBottom: themeConstants.SECONDARY_MRG
          }}>
          {
            bookName && chapterNo ? (
              <Fragment>
                <Typography
                  color="primary"
                  marginBottom={themeConstants.SENARY_MRG}
                  fontSize={themeConstants.PRIMARY_FSZ} 
                  fontWeight="700"
                  textAlign="center">
                  {bookName.split(",")[0]}
                </Typography>
                
                <Typography
                  marginBottom={themeConstants.SENARY_MRG}
                  fontSize={themeConstants.TERNARY_FSZ} 
                  fontWeight="600"
                  textAlign="left">
                {`Chapter ${chapterNo}`}
                </Typography>
              </Fragment>
            ): null
          }
          {
            chapterNo && allVerse?.map(item=> (
              <Typography
                key={item.verse}
                fontSize={themeConstants.QUATERNARY_FSZ}
                sx={{ lineHeight: "2" }}
                gutterBottom={true}
                display="inline">
                {item.text.replace(/['"/\n]+/g, '')}
                <Typography
                  color="primary"
                  fontWeight="bold"
                  fontSize={themeConstants.SEPTINARY_FSZ}
                  display="inline">
                  &ensp;[&nbsp;{item.verse}&nbsp;]&emsp;
                </Typography>
              </Typography>)
            )
          }
        </Grid>
        {
          chapterNo ? (
            <Button
              color="secondary"
              sx={{
                borderRadius: "40px",
                position: "fixed",
                bottom: "10px",
                right: "10px",
              }}
              onClick={()=> window.scrollTo(0, 0)}>
              <img 
                src={ArrowTop} 
                alt="GO TOP"
                width={isMobile ? "30px" : "40px"}
                height={isMobile ? "40px" : "70px"}
              />
            </Button>
          ) : null
        }

      </Grid>      
    </Fragment>
  )
}

export default ReadBiblePage;