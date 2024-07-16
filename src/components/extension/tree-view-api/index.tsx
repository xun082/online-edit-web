'use client';

import React, {
  ReactElement,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { FolderIcon, FolderOpenIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/utils/cn';
import { useUploadFileDataStore } from '@/store/uploadFileDataStore';

type TreeViewElement = {
  id: string;
  filename: string;
  isSelectable?: boolean;
  language?: string;
  value?: string;
  children?: TreeViewElement[];
  kind: string;
  status: string;
};

type TreeContextProps = {
  selectedId: string | undefined;
  expendedItems: string[] | undefined;
  indicator: boolean;
  handleExpand: (id: string) => void;
  selectItem: (id: string) => void;
  setExpendedItems?: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  direction: 'rtl' | 'ltr';
};

const TreeContext = createContext<TreeContextProps | null>(null);

const useTree = () => {
  const context = useContext(TreeContext);

  if (!context) {
    throw new Error('useTree must be used within a TreeProvider');
  }

  return context;
};

interface TreeViewComponentProps extends React.HTMLAttributes<HTMLDivElement> {}

type Direction = 'rtl' | 'ltr' | undefined;

type TreeViewProps = {
  initialSelectedId?: string;
  indicator?: boolean;
  elements?: TreeViewElement[];
  initialExpendedItems?: string[];
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
} & TreeViewComponentProps;

const Tree = forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      className,
      elements,
      initialSelectedId,
      initialExpendedItems,
      children,
      indicator = true,
      openIcon,
      closeIcon,
      dir,
      ...props
    },
    ref,
  ) => {
    const [selectedId, setSelectedId] = useState<string | undefined>(initialSelectedId);
    const [expendedItems, setExpendedItems] = useState<string[] | undefined>(initialExpendedItems);
    // use for add
    const { setSelected } = useUploadFileDataStore();

    const selectItem = useCallback((id: string) => {
      setSelectedId(id);
      setSelected(id);
    }, []);

    const handleExpand = useCallback((id: string) => {
      setExpendedItems((prev) => {
        if (prev?.includes(id)) {
          return prev.filter((item) => item !== id);
        }

        return [...(prev ?? []), id];
      });
    }, []);

    const expandSpecificTargetedElements = useCallback(
      (elements?: TreeViewElement[], selectId?: string) => {
        if (!elements || !selectId) return;

        const findParent = (currentElement: TreeViewElement, currentPath: string[] = []) => {
          const isSelectable = currentElement.isSelectable ?? true;
          const newPath = [...currentPath, currentElement.id];

          if (currentElement.id === selectId) {
            if (isSelectable) {
              setExpendedItems((prev) => [...(prev ?? []), ...newPath]);
            } else {
              if (newPath.includes(currentElement.id)) {
                newPath.pop();
                setExpendedItems((prev) => [...(prev ?? []), ...newPath]);
              }
            }

            return;
          }

          if (isSelectable && currentElement.children && currentElement.children.length > 0) {
            currentElement.children.forEach((child) => {
              findParent(child, newPath);
            });
          }
        };

        elements.forEach((element) => {
          findParent(element);
        });
      },
      [],
    );

    useEffect(() => {
      if (initialSelectedId) {
        expandSpecificTargetedElements(elements, initialSelectedId);
      }
    }, [initialSelectedId, elements]);

    const direction = dir === 'rtl' ? 'rtl' : 'ltr';

    return (
      <TreeContext.Provider
        value={{
          selectedId,
          expendedItems,
          handleExpand,
          selectItem,
          setExpendedItems,
          indicator,
          openIcon,
          closeIcon,
          direction,
        }}
      >
        <div className={cn('size-full', className)}>
          <ScrollArea ref={ref} className="h-full relative px-2" dir={dir as Direction}>
            <AccordionPrimitive.Root
              {...props}
              type="multiple"
              defaultValue={expendedItems}
              value={expendedItems}
              className="flex flex-col gap-1"
              onValueChange={(value) => setExpendedItems((prev) => [...(prev ?? []), value[0]])}
              dir={dir as Direction}
            >
              {children}
            </AccordionPrimitive.Root>
          </ScrollArea>
        </div>
      </TreeContext.Provider>
    );
  },
);

Tree.displayName = 'Tree';

const TreeIndicator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { direction } = useTree();

    return (
      <div
        dir={direction}
        ref={ref}
        className={cn(
          'h-full w-[0.5px] bg-white/10 absolute left-1.5 rtl:right-1.5 py-3 rounded-md hover:bg-slate-300 duration-300 ease-in-out',
          className,
        )}
        {...props}
      />
    );
  },
);

TreeIndicator.displayName = 'TreeIndicator';

interface FolderComponentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}

type FolderProps = {
  expendedItems?: string[];
  element: string;
  isSelectable?: boolean;
  isSelect?: boolean;
  empty?: boolean;
} & FolderComponentProps;

const Folder = forwardRef<HTMLDivElement, FolderProps & React.HTMLAttributes<HTMLDivElement>>(
  (
    { className, element, value, isSelectable = true, isSelect, children, empty, ...props },
    ref,
  ) => {
    const {
      direction,
      handleExpand,
      selectedId,
      selectItem,
      expendedItems,
      indicator,
      setExpendedItems,
      openIcon,
      closeIcon,
    } = useTree();
    const Ele = empty ? 'div' : AccordionPrimitive.Item;

    return (
      <Ele ref={ref} {...props} value={value} className="relative overflow-hidden h-full ">
        <AccordionPrimitive.Trigger
          className={cn(
            `flex items-center gap-1 text-sm w-full border-[1px] border-[#202327]`,
            className,
            {
              'bg-muted rounded-md': isSelect && isSelectable,
              'cursor-pointer': isSelectable,
              'cursor-not-allowed opacity-50': !isSelectable,
              ' bg-[#3f86f5]/30  border-[#3f86f5]': selectedId === value,
            },
          )}
          disabled={!isSelectable}
          onClick={() => {
            handleExpand(value);
            selectItem(value);
          }}
        >
          {expendedItems?.includes(value)
            ? openIcon ?? <FolderOpenIcon className="h-3 w-3" />
            : closeIcon ?? <FolderIcon className="h-3 w-3" />}
          <span>{element}</span>
        </AccordionPrimitive.Trigger>
        <AccordionPrimitive.Content className="text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down relative overflow-hidden h-full">
          {element && indicator && <TreeIndicator aria-hidden="true" />}
          {!empty && (
            <AccordionPrimitive.Root
              dir={direction}
              type="multiple"
              className="flex flex-col gap-1 py-1 ml-3 rtl:mr-5 overflow-ellipsis whitespace-nowrap overflow-hidden "
              defaultValue={expendedItems}
              value={expendedItems}
              onValueChange={(value) => {
                setExpendedItems?.((prev) => [...(prev ?? []), value[0]]);
              }}
            >
              {children}
            </AccordionPrimitive.Root>
          )}
        </AccordionPrimitive.Content>
      </Ele>
    );
  },
);

Folder.displayName = 'Folder';

const File = forwardRef<
  HTMLButtonElement,
  {
    value: string;
    handleSelect?: (id: string) => void;
    isSelectable?: boolean;
    isSelect?: boolean;
    fileIcon?: React.ReactNode;
  } & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ value, className, handleSelect, isSelectable = true, isSelect, children, ...props }, ref) => {
  const { direction, selectedId, selectItem } = useTree();
  const isSelected = isSelect ?? selectedId === value;

  return (
    <AccordionPrimitive.Item value={value} className="relative">
      <AccordionPrimitive.Trigger
        ref={ref}
        {...props}
        dir={direction}
        disabled={!isSelectable}
        aria-label="File"
        className={cn(
          'flex w-full items-center gap-1 p-[0.5px] cursor-pointer text-sm pr-1 rtl:pl-1 rtl:pr-0 hover:bg-[#3c4453]/60  duration-200 ease-in-out',
          {
            'bg-[#3c4453]': isSelected && isSelectable,
          },
          isSelectable ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed',
          className,
        )}
      >
        {React.cloneElement(children as ReactElement, {
          onMouseupFn: () => selectItem(value),
          handleSelect,
        })}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Item>
  );
});

File.displayName = 'File';

const CollapseButton = forwardRef<
  HTMLButtonElement,
  {
    elements: TreeViewElement[];
    expandAll?: boolean;
  } & React.HTMLAttributes<HTMLButtonElement>
>(({ className, elements, expandAll = false, children, ...props }, ref) => {
  const { expendedItems, setExpendedItems } = useTree();

  const expendAllTree = useCallback((elements: TreeViewElement[]) => {
    const expandTree = (element: TreeViewElement) => {
      const isSelectable = element.isSelectable ?? true;

      if (isSelectable && element.children && element.children.length > 0) {
        setExpendedItems?.((prev) => [...(prev ?? []), element.id]);
        element.children.forEach(expandTree);
      }
    };

    elements.forEach(expandTree);
  }, []);

  const closeAll = useCallback(() => {
    setExpendedItems?.([]);
  }, []);

  useEffect(() => {
    if (expandAll) {
      expendAllTree(elements);
    }
  }, [expandAll]);

  return (
    <Button
      variant={'ghost'}
      className={cn('h-8 w-fit p-1 absolute bottom-1 right-2', className)}
      onClick={expendedItems && expendedItems.length > 0 ? closeAll : () => expendAllTree(elements)}
      ref={ref}
      {...props}
    >
      {children}
      <span className="sr-only">Toggle</span>
    </Button>
  );
});

CollapseButton.displayName = 'CollapseButton';

export { Tree, Folder, File, CollapseButton, type TreeViewElement };
