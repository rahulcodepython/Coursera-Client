import { getCookies } from "@/server/action";
import axios from "axios";
import EditCourseForm from "./EditCourseForm";
import { AllCourseType } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const EditCourse = async ({ params }: { params: Promise<{ courseid: string | undefined }> }) => {
    const { access_token } = await getCookies(['access_token']);
    const { courseid } = await params;

    const response = await axios.request({
        url: `${process.env.BASE_API_URL}/course/single-course/${courseid}/`,
        method: 'GET',
        headers: {
            authorization: `Bearer ${access_token}`
        }
    });
    const data: AllCourseType = response.data;

    return (
        <Card className="mx-28 my-10">
            <CardHeader>
                <h2 className="text-xl font-semibold">Edit Course</h2>
            </CardHeader>
            <CardContent>
                <EditCourseForm defaultValues={data} courseid={courseid} access_token={access_token} />
            </CardContent>
        </Card>
    );
}

export default EditCourse;