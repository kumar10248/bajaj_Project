import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

const App = () => {
  const [jsonInput, setJsonInput] = useState('{"data": ["A","1","B","2"]}');
  const [error, setError] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "kumardevashish000";
    testApiConnection();
  }, []);

  const testApiConnection = async () => {
    try {
      const response = await fetch('http://localhost:8000/bfhl', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('API connection failed');
      const data = await response.json();
      console.log('API Connection successful:', data);
    } catch (err) {
      console.error('API Connection failed:', err);
      setError('Cannot connect to the server. Please ensure the backend is running on port 8000.');
    }
  };

  const filterOptions = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_alphabet', label: 'Highest Alphabet' }
  ];

  const validateAndParseJSON = (input:any) => {
    try {
      const parsed = JSON.parse(input);
      if (!parsed.data || !Array.isArray(parsed.data)) {
        throw new Error('Input must contain a "data" array');
      }
      return parsed;
    } catch (e) {
      throw new Error('Invalid JSON format. Please enter valid JSON with a data array.');
    }
  };

  const handleSubmit = async () => {
    try {
      setError('');
      setIsLoading(true);
      
      const parsedData = validateAndParseJSON(jsonInput);
      
      const response = await fetch('http://localhost:8000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process data. Please try again.');
      }

      const data = await response.json();
      setApiResponse(data);
      setSelectedFilters([]);
    } catch (err:any) {
      setError(err.message || 'Failed to connect to the server. Please ensure the backend is running.');
      setApiResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  const renderResponse = () => {
    if (!apiResponse) return null;
  
    // If no filters selected, show all data
    const dataToShow = selectedFilters.length === 0 
      ? apiResponse 
      : Object.fromEntries(
          Object.entries(apiResponse).filter(([key]) => 
            selectedFilters.includes(key)
          )
        );
  
    return (
      <div className="mt-4 space-y-2">
        {Object.entries(dataToShow).map(([key, value]) => (
          <div key={key} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
            <span className="font-semibold text-gray-700 capitalize">
              {key.replace('_', ' ')}: 
            </span>
            <span className="text-gray-600">
              {Array.isArray(value) ? value.join(', ') : String(value)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <Card className="max-w-2xl mx-auto bg-white shadow-lg">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-2xl font-bold text-gray-800">BFHL Data Processor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              JSON Input
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-gray-700 bg-white"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='Enter JSON (e.g., {"data": ["A","1","B","2"]})'
              rows={4}
            />
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
          >
            {isLoading ? 'Processing...' : 'Submit'}
          </Button>

          {error && (
            <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

{apiResponse && (
  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {selectedFilters.length === 0 
            ? "Show All Data" 
            : `Selected Filters (${selectedFilters.length})`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {filterOptions.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={selectedFilters.includes(option.value)}
            onCheckedChange={(checked) => {
              setSelectedFilters((prev:any) =>
                checked 
                  ? [...prev, option.value]
                  : prev.filter((item:any) => item !== option.value)
              );
            }}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
    {renderResponse()}
  </div>
)}
        </CardContent>
      </Card>
    </div>
  );
};

export default App;