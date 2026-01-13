"use client";

import { useState } from "react";
import { EmailEditor } from "@/components/email-editor";
import { EmailPreview } from "@/components/email-preview";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MailIcon } from "@/components/ui/mail";

const DEFAULT_CODE = `import { Button, Html, Head, Preview, Body, Container, Section, Text, Tailwind } from "@react-email/components";
import * as React from "react";

/**
 * This implementation uses Tailwind CSS for styling and TSX for markup.
 * Feel free to edit this code to see changes live.
 */
export default function Email() {
  return (
    <Html>
      <Head />
      <Preview>Preview text for your email</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Text className="text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Welcome to <strong>Email Previewer</strong>
              </Text>
              <Text className="text-[14px] leading-[24px] text-black">
                Hello there,
              </Text>
              <Text className="text-[14px] leading-[24px] text-black">
                This is a live preview of your email template built using \`react.email\`. You can edit the code on the left and see the changes here instantly.
              </Text>
              <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                  className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                  href="https://react.email"
                >
                  Explore react.email
                </Button>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
`;

export default function Home() {
  const [code, setCode] = useState(DEFAULT_CODE);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground flex flex-col">
      <header className="h-12 border-b flex items-center px-4 shrink-0 bg-[#1e1e1e] border-[#333]">
        <div className="flex items-center gap-2">
          <MailIcon className="w-4 h-4 text-gray-400" />
          <h1 className="font-medium text-sm text-gray-400">Email Previewer</h1>
        </div>
      </header>
      <ResizablePanelGroup orientation="horizontal" className="flex-1">
        <ResizablePanel defaultSize={50} minSize={20} className="bg-[#1e1e1e]">
          <EmailEditor value={code} onChange={(val) => setCode(val || "")} />
        </ResizablePanel>
        <ResizableHandle className="bg-[#333] hover:bg-[#444] transition-colors w-[1px]" />
        <ResizablePanel defaultSize={50} minSize={20}>
          <EmailPreview code={code} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
