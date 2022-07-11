import React, { useState, useEffect, FC } from "react";
import TalkList from "@/pages/community/TalkList";
import TopContributors from "./TopContributors";
import UnansweredTalks from "./UnansweredTalks";

interface PageProps {}

const Index: FC<PageProps> = () => {
    return (
        <div className="d-container max-w-1128 px-16">
            <div className="lg:flex lg:-mx-12">
                <div className="lg:px-12 lg:w-3/4">
                    <TalkList />
                </div>
                <div className="pb-16 pt-32 sm:py-24 md:py-32 lg:py-48 lg:px-12 lg:w-1/4">
                    <div className="lg:sticky pin-t-16">
                        <TopContributors />
                        <UnansweredTalks />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
