// app/[...slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
    isValidSubject,
    isValidBoard,
    isValidCity,
    isValidMode,
    isValidGrade,
    type Subject,
    type Board,
    type City,
    type Mode,
} from "@/lib/seoData";

type PageProps = {
    params: Promise<{ slug?: string[] }>;
};

// Normalize helper
const normalize = (s: string) => s.toLowerCase().trim();

export default async function DynamicTutorPage({ params }: PageProps) {
    const resolvedParams = await params;
    if (!resolvedParams?.slug || resolvedParams.slug.length === 0) notFound();

    const slugParts = resolvedParams.slug.map(normalize);
    const fullSlug = slugParts.join("-");

    // 🔹 Pattern 1: /math-tutors-in-bangalore  ← ADD THIS BACK!
    const subjectCityRegex = /^(.+?)-tutors?-in-(.+)$/i;
    const subjectCityMatch = fullSlug.match(subjectCityRegex);

    if (subjectCityMatch) {
        const [_, rawSubject, rawCity] = subjectCityMatch;
        const subject = normalize(rawSubject);
        const city = normalize(rawCity);

        if (isValidSubject(subject) && isValidCity(city)) {
            return (
                <div>
                    <h1>
                        Tutors for {subject} in {city}
                    </h1>
                    <p>Standard subject-in-city page.</p>
                </div>
            );
        }
        notFound();
    }

    // 🔹 Pattern 2: /home-tutors-12-cbse-bangalore
    const homeTutorRegex = /^home-tutors-(\d{1,2})-(cbse|icse|state)-(.+)$/i;
    const homeMatch = fullSlug.match(homeTutorRegex);

    if (homeMatch) {
        const [_, rawGrade, rawBoard, rawCity] = homeMatch;
        const grade = rawGrade;
        const board = normalize(rawBoard) as Board;
        const city = normalize(rawCity);

        if (isValidGrade(grade) && isValidBoard(board) && isValidCity(city)) {
            return (
                <div>
                    <h1>
                        Home Tutors for Grade {grade} ({board.toUpperCase()}) in{" "}
                        {city}
                    </h1>
                </div>
            );
        }
        notFound();
    }

    // 🔹 Pattern 3: /tutors/online-math-tutors → "tutors-online-math-tutors"
    const onlineTutorRegex = /^tutors-(online|offline)-(.+)-tutors$/i;
    const onlineMatch = fullSlug.match(onlineTutorRegex);

    if (onlineMatch) {
        const [_, rawMode, rawSubject] = onlineMatch;
        const mode = normalize(rawMode) as Mode;
        const subject = normalize(rawSubject);

        if (isValidMode(mode) && isValidSubject(subject)) {
            return (
                <div>
                    <h1>
                        {mode === "online" ? "Online" : "Offline"} {subject}{" "}
                        Tutors
                    </h1>
                </div>
            );
        }
        notFound();
    }

    // ❌ No pattern matched
    notFound();
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    if (!resolvedParams?.slug || resolvedParams.slug.length === 0) {
        return { title: "Page Not Found" };
    }

    const slugParts = resolvedParams.slug.map(normalize);
    const fullSlug = slugParts.join("-");

    // 🔹 Pattern 1: subject-tutors-in-city
    const subjectCityMatch = fullSlug.match(/^(.+?)-tutors?-in-(.+)$/i);
    if (subjectCityMatch) {
        const [_, rawSubject, rawCity] = subjectCityMatch;
        const subject = normalize(rawSubject);
        const city = normalize(rawCity);

        if (isValidSubject(subject) && isValidCity(city)) {
            return {
                title: `${
                    subject.charAt(0).toUpperCase() + subject.slice(1)
                } Tutors in ${city} | YourSite`,
                description: `Find the best ${subject} tutors in ${city}.`,
            };
        }
    }

    // 🔹 Pattern 2: home-tutors
    const homeMatch = fullSlug.match(
        /^home-tutors-(\d{1,2})-(cbse|icse|state)-(.+)$/i
    );
    if (homeMatch) {
        const [_, rawGrade, rawBoard, rawCity] = homeMatch;
        const grade = rawGrade;
        const board = rawBoard.toLowerCase() as Board;
        const city = rawCity.toLowerCase();
        if (isValidGrade(grade) && isValidBoard(board) && isValidCity(city)) {
            return {
                title: `Grade ${grade} ${board.toUpperCase()} Home Tutors in ${city}`,
            };
        }
    }

    // 🔹 Pattern 3: online/offline
    const onlineMatch = fullSlug.match(
        /^tutors-(online|offline)-(.+)-tutors$/i
    );
    if (onlineMatch) {
        const [_, rawMode, rawSubject] = onlineMatch;
        const mode = rawMode.toLowerCase() as Mode;
        const subject = rawSubject.toLowerCase();

        if (isValidMode(mode) && isValidSubject(subject)) {
            return {
                title: `${
                    mode === "online" ? "Online" : "Offline"
                } ${subject} Tutors`,
            };
        }
    }

    return { title: "Tutor Page Not Found" };
}
