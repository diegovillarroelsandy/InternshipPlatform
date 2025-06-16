import React from "react";
import Slider from "react-slick";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const propuestas = [
  {
    title: "Propuesta 1",
    description: "Descripción corta",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmt9HWeKsVUssKxA2aRFq3tb1VFtNMxenpdg&s",
  },
  {
    title: "Propuesta 2",
    description: "Otra idea útil",
    img: "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/72B2/production/_112826392_gettyimages-480952865.jpg.webp",
  },
  {
    title: "Propuesta 3",
    description: "Algo interesante",
    img: "https://i.blogs.es/a2066e/programando/1366_2000.jpg",
  },
  {
    title: "Propuesta 4",
    description: "Contenido útil",
    img: "https://www.aprendemas.com/mx/blog/images/2023/01/aprender_programacion.jpg",
  },
];

export default function CarouselSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [{ breakpoint: 960, settings: { slidesToShow: 1 } }],
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Nuestras Propuestas
      </Typography>
      <Slider {...settings}>
        {propuestas.map((item, index) => (
          <Box key={index} px={2}>
            <Card>
              <CardMedia
                component="img"
                height="240"
                image={item.img}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
