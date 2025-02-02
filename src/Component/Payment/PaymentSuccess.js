import React from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '@mui/material';

export const PaymentSuccess = () =>{
    const navigate = useNavigate();
    return (
        <div className="min-h-screen px -5">
            <div className="flex flex-col items-center justify-center h-[90vh]">
                <Card className="box w-full lg:w1/4 flex flex-col items-center rounded-md">
                    <TaskAltIcon sx={{fontSize:"5rem"}}/>
                    <h1 className="py-5 text-2xl font-semibold">Đặt hàng thành công</h1>
                    <p>Cảm ơn đã chọn sử dụng dịch vụ nhà hàng chúng tôi</p>
                    <Button onClick={()=>navigate("/")} variant="contained" className="py-5" sx={{margin:"1 rem 0 rem"}}>Trở về trang chính</Button>
                </Card>
            </div>
        </div>
    )
}