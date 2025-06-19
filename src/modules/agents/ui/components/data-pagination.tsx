import {Button} from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props{
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const DataPagination = ({page, totalPages, onPageChange}: Props) => {
    

    return (
      <div className="flex items-center justify-between">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {page} of {totalPages || 1}
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            disabled={page <= 1}
            onClick={() => onPageChange(Math.max(1,page-1)) }
            variant={"outline"}
          >
            <ChevronLeft className='text-primary' />
          </Button>

          <Button
            disabled={page >= totalPages || totalPages === 0}
            onClick={() => onPageChange(Math.min(totalPages,page+1)) }
            variant={"outline"}
          >
            <ChevronRight className='text-primary font-bold text-lg' />
          </Button>
        </div>
      </div>
    );
}