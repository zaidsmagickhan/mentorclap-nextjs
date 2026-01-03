import React, { Suspense } from "react";
import EnquiryList from "./EnquiryList";
import LoaderMinimal from "@/component/loader/LoaderMinimal";

const page = () => {
    return (
        <Suspense fallback={<LoaderMinimal />}>
            <EnquiryList />;
        </Suspense>
    );
};

export default page;
