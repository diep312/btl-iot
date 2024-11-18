import {
  Box,
  GridItem,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAttachMoney,
  MdDeviceHub,
  MdSunny,
  MdCloud,
} from "react-icons/md";

import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import MonthStatistics from "./components/MonthStatistics";
import PieCard from "./components/PieCard";
import { UserState } from "contexts/UserContext";
import { getLatestData } from "api/api";

export default function UserReports() {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const { user } = UserState();
  const [airQuality, setAirQuality] = React.useState(null);
  const [lightValue, setLightnessValue] = React.useState(null);

  React.useEffect(() => {
    if (user && user.deviceId) {
      const interval = setInterval(async () => {
        try {
          const latestAirData = await getLatestData("air", user.deviceId);
          const latestLightData = await getLatestData("light", user.deviceId);
     
          if (latestAirData.data.data.data.length > 0) {
            setAirQuality(latestAirData.data.data.data[0].ppm); 
   
          }
        
          if (latestLightData.data.data.data.length > 0) {
              setLightnessValue(latestLightData.data.data.data[0].lux); 
          }
        
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }, 5000);
  
      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        gap='20px'
        mb='20px'>

        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdDeviceHub} color={brandColor} />
              }
            />
          }
          name='Thiết bị kết nối'
          value={user.deviceId}
        />
        
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdCloud} color={brandColor} />
              }
            />
          }
          name='Chất luợng không khí'
          value={airQuality !== null ? airQuality : "Loading..."}

        />

        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdSunny} color={brandColor} />
              }
            />
          }
          name='Độ sáng'
          value={lightValue !== null ? lightValue : "Loading..."}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent/>
        <WeeklyRevenue/>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
        <MonthStatistics/>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 3, xl: 3 }} gap='20px' mb='20px'>
        <Tasks/>
        <GridItem colSpan={{base: 1, md: 2, xl: 2}}>
            <PieCard/>
        </GridItem>
  
      </SimpleGrid>
    </Box>
  );
}
