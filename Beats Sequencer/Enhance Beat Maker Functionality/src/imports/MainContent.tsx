import svgPaths from "./svg-peu02ns12a";

function Input() {
  return (
    <div className="bg-[#27272a] content-stretch flex items-center justify-center px-[16px] py-[4px] relative rounded-[2px] shrink-0" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#f1f5f9] text-[16px]">120</p>
    </div>
  );
}

function PlayBeatToolbarLeft() {
  return (
    <div className="content-stretch flex gap-[40px] items-center relative shrink-0" data-name="Play Beat Toolbar (left)">
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Input Text">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#f1f5f9] text-[16px]">Tempo</p>
        <Input />
      </div>
      <div className="bg-[#8200db] content-stretch flex gap-[4px] items-center justify-center p-[8px] relative rounded-[8px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#ad46ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Icon">
            <div className="absolute inset-[-5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 16.5">
                <g id="Icon">
                  <path d={svgPaths.p3031a300} stroke="var(--stroke-0, #F8FAFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p2aad7200} stroke="var(--stroke-0, #F8FAFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <p className="font-['Geist:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#f8fafc] text-[16px]">Playback</p>
      </div>
    </div>
  );
}

function IconWrapper() {
  return (
    <div className="bg-[#27272a] content-stretch flex items-center p-[4px] relative rounded-[4px] shrink-0" data-name="icon wrapper">
      <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="overflow-clip relative rounded-[4px] shrink-0 size-[20px]" data-name="Icon">
        <div className="absolute inset-[18.75%_9.38%]" data-name="Icon">
          <div className="absolute inset-[-6%_-4.62%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.75 14">
              <path d={svgPaths.pb0ea00} id="Icon" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconWrapper1() {
  return (
    <div className="bg-[#27272a] content-stretch flex items-center p-[4px] relative rounded-[4px] shrink-0" data-name="icon wrapper">
      <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="overflow-clip relative rounded-[4px] shrink-0 size-[20px]" data-name="Icon">
        <div className="absolute inset-[15.63%_7.68%]" data-name="Icon">
          <div className="absolute inset-[-5.45%_-4.43%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.4272 15.25">
              <path d={svgPaths.p14df6180} id="Icon" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconWrapper2() {
  return (
    <div className="bg-[#27272a] content-stretch flex items-center p-[4px] relative rounded-[4px] shrink-0" data-name="icon wrapper">
      <div aria-hidden="true" className="absolute border border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="overflow-clip relative rounded-[4px] shrink-0 size-[20px]" data-name="Icon">
        <div className="absolute inset-[9.38%_15.63%]" data-name="Icon">
          <div className="absolute inset-[-4.62%_-5.45%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.25 17.75">
              <path d={svgPaths.p2543cf1} id="Icon" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function SaveBeatToolbarRight() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Save Beat Toolbar (right)">
      <div className="content-stretch flex gap-[8px] items-center justify-center p-[8px] relative shrink-0" data-name="Button">
        <IconWrapper />
        <p className="font-['Geist:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#f1f5f9] text-[16px]">Save Beat</p>
      </div>
      <div className="content-stretch flex gap-[8px] items-center justify-center p-[8px] relative shrink-0" data-name="Button">
        <IconWrapper1 />
        <p className="font-['Geist:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#f1f5f9] text-[16px]">Open Beat</p>
      </div>
      <div className="content-stretch flex gap-[8px] items-center justify-center p-[8px] relative shrink-0" data-name="Button">
        <IconWrapper2 />
        <p className="font-['Geist:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#f1f5f9] text-[16px]">New Beat</p>
      </div>
    </div>
  );
}

function PlaybackTools() {
  return (
    <div className="bg-[#18181b] relative rounded-tl-[12px] rounded-tr-[12px] shrink-0 w-full" data-name="Playback Tools">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-between px-[40px] py-[16px] relative w-full">
          <PlayBeatToolbarLeft />
          <SaveBeatToolbarRight />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#3f3f47] border-solid inset-0 pointer-events-none rounded-tl-[12px] rounded-tr-[12px]" />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex items-center justify-center p-[8px] relative shrink-0" data-name="Title">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#3f3f47] text-[20px]">Tracks</p>
    </div>
  );
}

function InstrumentTitles1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Instrument Titles">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[8px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#9f9fa9] text-[20px]">Kick</p>
        </div>
      </div>
    </div>
  );
}

function InstrumentTitles2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Instrument Titles">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[8px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#9f9fa9] text-[20px]">Snare</p>
        </div>
      </div>
    </div>
  );
}

function InstrumentTitles3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Instrument Titles">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[8px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#9f9fa9] text-[20px]">Open Hi-hat</p>
        </div>
      </div>
    </div>
  );
}

function InstrumentTitles4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Instrument Titles">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[8px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#9f9fa9] text-[20px]">Closed Hi-hat</p>
        </div>
      </div>
    </div>
  );
}

function InstrumentTitles5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Instrument Titles">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[8px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#9f9fa9] text-[20px]">Clap</p>
        </div>
      </div>
    </div>
  );
}

function InstrumentTitles() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px min-w-px relative" data-name="Instrument Titles">
      <InstrumentTitles1 />
      <InstrumentTitles2 />
      <InstrumentTitles3 />
      <InstrumentTitles4 />
      <InstrumentTitles5 />
    </div>
  );
}

function TrackTitles() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-full items-start relative shrink-0" data-name="Track Titles">
      <Title />
      <InstrumentTitles />
    </div>
  );
}

function InstrumentGrids() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0" data-name="Instrument Grids">
      <div className="content-stretch flex gap-[16px] items-center py-[8px] relative shrink-0" data-name="Grid Rows">
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
      </div>
      <div className="content-stretch flex gap-[16px] items-center py-[8px] relative shrink-0" data-name="Grid Rows">
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
      </div>
      <div className="content-stretch flex gap-[16px] items-center py-[8px] relative shrink-0" data-name="Grid Rows">
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
      </div>
      <div className="content-stretch flex gap-[16px] items-center py-[8px] relative shrink-0" data-name="Grid Rows">
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
      </div>
      <div className="content-stretch flex gap-[16px] items-center py-[8px] relative shrink-0" data-name="Grid Rows">
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#3f3f47] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[#18181b] relative rounded-[8px] shrink-0 size-[40px]" data-name="Grid Item">
          <div aria-hidden="true" className="absolute border border-[#4a5565] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
      </div>
    </div>
  );
}

function TrackGrid() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Track Grid">
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Grid Rows">
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[40px]" data-name="Grid Item">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#3f3f47] text-[16px]">#</p>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[40px]" data-name="Grid Item">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#3f3f47] text-[16px]">#</p>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[40px]" data-name="Grid Item">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#3f3f47] text-[16px]">#</p>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[40px]" data-name="Grid Item">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#3f3f47] text-[16px]">#</p>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[40px]" data-name="Grid Item">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#3f3f47] text-[16px]">#</p>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[40px]" data-name="Grid Item">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#3f3f47] text-[16px]">#</p>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[40px]" data-name="Grid Item">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#3f3f47] text-[16px]">#</p>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[40px]" data-name="Grid Item">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#3f3f47] text-[16px]">#</p>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[40px]" data-name="Grid Item">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#3f3f47] text-[16px]">#</p>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[40px]" data-name="Grid Item">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#3f3f47] text-[16px]">#</p>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[40px]" data-name="Grid Item">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#3f3f47] text-[16px]">#</p>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[40px]" data-name="Grid Item">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#3f3f47] text-[16px]">#</p>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[40px]" data-name="Grid Item">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#3f3f47] text-[16px]">#</p>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[40px]" data-name="Grid Item">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#3f3f47] text-[16px]">#</p>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[40px]" data-name="Grid Item">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#3f3f47] text-[16px]">#</p>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0 size-[40px]" data-name="Grid Item">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#3f3f47] text-[16px]">#</p>
        </div>
      </div>
      <InstrumentGrids />
    </div>
  );
}

function BeatGrid() {
  return (
    <div className="bg-[#18181b] relative shrink-0 w-full" data-name="Beat Grid">
      <div className="content-stretch flex flex-col items-center overflow-clip py-[32px] relative rounded-[inherit] w-full">
        <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="BeatGrid">
          <div className="flex flex-row items-center self-stretch">
            <TrackTitles />
          </div>
          <TrackGrid />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#3f3f47] border-b-2 border-l-2 border-r-2 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Beatmaker() {
  return (
    <div className="content-stretch flex flex-col items-start relative shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Beatmaker">
      <PlaybackTools />
      <BeatGrid />
    </div>
  );
}

export default function MainContent() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#09090b] items-start px-[80px] py-[40px] relative size-full to-[#18181b] to-[87.258%]" data-name="Main Content">
      <Beatmaker />
    </div>
  );
}