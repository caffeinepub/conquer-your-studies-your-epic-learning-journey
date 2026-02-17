import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SyllabusItemSelector } from '../components/SyllabusItemSelector';
import { TaskList } from '../components/TaskList';
import { useSyllabusItems, useCreateSyllabusItem, useAddTask, useUpdateTaskStatus } from '../hooks/useQueries';
import { Status } from '../backend';
import { Loader2, Plus, Swords, BookOpen, ListChecks } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function DivideAndConquer() {
  const [chapter, setChapter] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [newTask, setNewTask] = useState('');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const { data: items, isLoading } = useSyllabusItems();
  const createItem = useCreateSyllabusItem();
  const addTask = useAddTask();
  const updateStatus = useUpdateTaskStatus();

  const selectedItem = items?.find(item => item.id === selectedItemId);

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chapter.trim() || !topic.trim()) return;

    try {
      const newId = await createItem.mutateAsync({
        chapter: chapter.trim(),
        topic: topic.trim(),
        description: description.trim()
      });
      setChapter('');
      setTopic('');
      setDescription('');
      setSelectedItemId(newId);
    } catch (error) {
      console.error('Failed to create syllabus item:', error);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemId || !newTask.trim()) return;

    try {
      await addTask.mutateAsync({
        id: selectedItemId,
        task: newTask.trim()
      });
      setNewTask('');
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const handleUpdateStatus = async (taskIndex: number, newStatus: Status) => {
    if (!selectedItemId) return;

    try {
      await updateStatus.mutateAsync({
        id: selectedItemId,
        taskIndex: BigInt(taskIndex),
        newStatus
      });
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Swords className="w-10 h-10 text-primary" />
          <h2 className="text-4xl font-display font-bold">Divide and Conquer</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Break down your chapters into manageable tasks and claim victory one step at a time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Create Chapter */}
        <Card className="border-2 shadow-battle">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              <CardTitle className="font-display">Create New Chapter</CardTitle>
            </div>
            <CardDescription>
              Establish a new territory on your war map
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateItem} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chapter" className="font-medium">Chapter Name *</Label>
                <Input
                  id="chapter"
                  placeholder="e.g., Mathematics - Calculus"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  required
                  disabled={createItem.isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic" className="font-medium">Topic *</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Derivatives and Integrals"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                  disabled={createItem.isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-medium">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief overview of what this chapter covers..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  disabled={createItem.isPending}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full font-display"
                disabled={createItem.isPending || !chapter.trim() || !topic.trim()}
              >
                {createItem.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Chapter
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right Column: Manage Tasks */}
        <Card className="border-2 shadow-battle">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ListChecks className="w-6 h-6 text-primary" />
              <CardTitle className="font-display">Manage Tasks</CardTitle>
            </div>
            <CardDescription>
              Add and track tasks for your selected chapter
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Chapter Selector */}
            <div className="space-y-2">
              <Label className="font-medium">Select Chapter</Label>
              <SyllabusItemSelector
                items={items || []}
                selectedId={selectedItemId}
                onSelect={setSelectedItemId}
                disabled={isLoading}
              />
            </div>

            {selectedItem && (
              <>
                <Separator />

                {/* Add Task Form */}
                <form onSubmit={handleAddTask} className="space-y-3">
                  <Label htmlFor="newTask" className="font-medium">Add New Task</Label>
                  <div className="flex gap-2">
                    <Input
                      id="newTask"
                      placeholder="e.g., Complete practice problems 1-10"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      disabled={addTask.isPending}
                      className="flex-1"
                    />
                    <Button 
                      type="submit" 
                      disabled={addTask.isPending || !newTask.trim()}
                      size="icon"
                    >
                      {addTask.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </form>

                <Separator />

                {/* Task List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">Tasks ({selectedItem.tasks.length})</Label>
                  </div>
                  <TaskList
                    item={selectedItem}
                    onUpdateStatus={handleUpdateStatus}
                    isUpdating={updateStatus.isPending}
                  />
                </div>
              </>
            )}

            {!selectedItem && items && items.length > 0 && (
              <Alert>
                <AlertDescription className="text-center py-4">
                  Select a chapter above to manage its tasks
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
