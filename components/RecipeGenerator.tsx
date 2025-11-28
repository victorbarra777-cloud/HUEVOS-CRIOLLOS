import React, { useState } from 'react';
import { generateEggRecipe } from '../services/geminiService';
import { Recipe } from '../types';
import { ChefHat, Loader2, Sparkles, Clock, BarChart } from 'lucide-react';

const RecipeGenerator: React.FC = () => {
  const [preferences, setPreferences] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecipe(null);

    try {
      const result = await generateEggRecipe(preferences);
      if (result) {
        setRecipe(result);
      } else {
        setError('Lo sentimos, no pudimos generar la receta en este momento. Intenta de nuevo.');
      }
    } catch (err) {
      setError('Ocurrió un error de conexión con el chef IA.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-farm-orange/10 rounded-full text-farm-orange mb-4">
            <Sparkles size={24} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900">Chef IA: Inspírate Cocinando</h2>
          <p className="mt-4 text-gray-500 text-lg">
            ¿No sabes qué cocinar con tus huevos criollos? Pregúntale a nuestro chef inteligente.
          </p>
        </div>

        <div className="bg-farm-cream rounded-2xl p-6 md:p-10 shadow-sm border border-farm-yellow/30">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 mb-2">
                ¿Qué ingredientes tienes o qué se te antoja?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="preferences"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-farm-orange focus:ring-farm-orange sm:text-lg px-4 py-3 border"
                  placeholder="Ej: espinacas, queso, algo rápido para cenar..."
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-farm-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-orange disabled:opacity-50 transition-colors whitespace-nowrap"
                >
                  {loading ? (
                    <><Loader2 className="animate-spin mr-2" /> Pensando...</>
                  ) : (
                    <><ChefHat className="mr-2" /> Crear Receta</>
                  )}
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          {recipe && (
            <div className="mt-8 bg-white rounded-xl p-6 shadow-md border border-gray-100 animate-fade-in">
              <div className="border-b border-gray-100 pb-4 mb-4">
                <h3 className="text-2xl font-serif font-bold text-gray-900 text-center">{recipe.title}</h3>
                <p className="text-center text-gray-500 italic mt-1">{recipe.description}</p>
                <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock size={16} className="text-farm-orange" />
                    {recipe.cookingTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart size={16} className="text-farm-orange" />
                    {recipe.difficulty}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 uppercase text-xs tracking-wider">Ingredientes</h4>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ing, idx) => (
                      <li key={idx} className="flex items-start text-gray-700 text-sm">
                        <span className="w-1.5 h-1.5 bg-farm-green rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 uppercase text-xs tracking-wider">Instrucciones</h4>
                  <ol className="space-y-4">
                    {recipe.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start text-gray-700 text-sm">
                        <span className="font-bold text-farm-orange mr-3 flex-shrink-0">{idx + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeGenerator;