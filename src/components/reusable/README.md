# Reusable Components Documentation

This folder contains reusable components that can be used throughout the application to maintain consistency and reduce code duplication.

## Components

### ImageUpload

A drag-and-drop image upload component with preview functionality.

**Features:**
- Drag and drop support
- Click to upload
- Image preview
- Remove image functionality
- Accepts: PNG, JPG, GIF
- Max size: 10MB

**Usage:**
```tsx
import { ImageUpload } from "@/components/reusable/ImageUpload";

function MyForm() {
  const [image, setImage] = useState("");
  
  return (
    <ImageUpload
      value={image}
      onChange={setImage}
      disabled={false}
    />
  );
}
```

**Props:**
- `value` (string): Current image URL or data URL
- `onChange` (function): Callback when image changes
- `disabled` (boolean, optional): Disable upload
- `className` (string, optional): Additional CSS classes

---

### ActionCard

A clickable card component for displaying actions with icons.

**Usage:**
```tsx
import { ActionCard } from "@/components/reusable/ActionCard";
import { Users } from "lucide-react";

function MyPage() {
  return (
    <ActionCard
      title="View Users"
      description="Manage all registered users"
      icon={Users}
      onClick={() => navigate("/users")}
      variant="primary"
    />
  );
}
```

**Props:**
- `title` (string): Card title
- `description` (string): Card description
- `icon` (LucideIcon): Icon component
- `onClick` (function, optional): Click handler
- `variant` ("default" | "primary" | "accent" | "destructive"): Color variant
- `disabled` (boolean, optional): Disable card
- `className` (string, optional): Additional CSS classes

**Variants:**
- `default`: Standard styling with hover effects
- `primary`: Blue accent with primary color
- `accent`: Teal accent
- `destructive`: Red accent for dangerous actions

---

### ActionButtonCard

A card component with an embedded button for specific actions.

**Usage:**
```tsx
import { ActionButtonCard } from "@/components/reusable/ActionCard";
import { Download } from "lucide-react";

function MyPage() {
  return (
    <ActionButtonCard
      title="Export Data"
      description="Download your data as CSV"
      icon={Download}
      buttonText="Download Now"
      onButtonClick={handleDownload}
      variant="accent"
    />
  );
}
```

**Props:**
- `title` (string): Card title
- `description` (string): Card description
- `icon` (LucideIcon): Icon component
- `buttonText` (string): Button label
- `onButtonClick` (function): Button click handler
- `variant` ("default" | "primary" | "accent" | "destructive"): Color variant
- `disabled` (boolean, optional): Disable button
- `className` (string, optional): Additional CSS classes

---

### PaginationControls

A pagination component for navigating through paginated data.

**Usage:**
```tsx
import { PaginationControls } from "@/components/reusable/PaginationControls";

function MyTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  
  return (
    <>
      {/* Your table content */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
```

**Props:**
- `currentPage` (number): Current active page (1-indexed)
- `totalPages` (number): Total number of pages
- `onPageChange` (function): Callback when page changes

**Features:**
- Automatic hide when only 1 page
- Previous/Next navigation
- Direct page number navigation
- Disabled states for edge pages

---

## Best Practices

1. **Import from the reusable folder:** Always import these components from `@/components/reusable/`
2. **Use semantic tokens:** All components use design system colors from `index.css`
3. **Accessibility:** Components include proper ARIA attributes
4. **Responsive:** All components work on mobile and desktop
5. **Type-safe:** Full TypeScript support with proper prop types

## Adding New Reusable Components

When creating new reusable components:

1. Place them in this folder: `src/components/reusable/`
2. Use the design system colors (HSL format)
3. Include proper TypeScript types
4. Add documentation to this README
5. Ensure accessibility (ARIA labels, keyboard navigation)
6. Make them responsive by default
7. Follow existing naming conventions
