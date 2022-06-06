import React from "react";
import { useRouter } from "next/router";

const Index = () => {
    const router = useRouter();
    const { pid } = router.query;

    return <div>photoDetail-{pid}</div>;
};

export default Index;
