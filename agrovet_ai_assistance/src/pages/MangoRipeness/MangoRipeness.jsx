import React, { useState } from 'react';
import Layout from '../../components/Layout';
import ImageUpload from '../../components/ImageUpload';
import { Grape, Clock, Star, AlertTriangle, CheckCircle } from 'lucide-react';
import './MangoRipeness.css';

const MangoRipeness = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageSelect = (file) => {
    setSelectedImage(file);
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = [
        {
          stage: 'Perfectly Ripe',
          confidence: 93,
          color: '#F97316',
          bgColor: 'bg-orange-50 border-orange-200',
          textColor: 'text-orange-800',
          icon: '🥭',
          description: 'This mango has reached perfect ripeness! Ideal texture and sweetness for immediate consumption.',
          characteristics: [
            'Rich golden-orange color',
            'Slightly soft when gently pressed',
            'Sweet, fragrant aroma',
            'Smooth, unblemished skin'
          ],
          texture: 'Soft and juicy',
          aroma: 'Strong and sweet',
          uses: [
            'Fresh eating and desserts',
            'Smoothies and lassis',
            'Fruit salads and salsas',
            'Premium juice extraction'
          ],
          nutritionalValue: 'Peak vitamin A, C, and antioxidants',
          shelfLife: '2-3 days refrigerated',
          sugarContent: 'High (13-15%)',
          firmness: 'Yields to gentle pressure'
        },
        {
          stage: 'Nearly Ripe',
          confidence: 87,
          color: '#EAB308',
          bgColor: 'bg-yellow-50 border-yellow-200',
          textColor: 'text-yellow-800',
          icon: '🟡',
          description: 'Almost ready! This mango needs 1-2 more days to reach optimal sweetness and texture.',
          characteristics: [
            'Yellow-green with orange patches',
            'Firm with slight give',
            'Mild sweet aroma',
            'Clean, healthy appearance'
          ],
          texture: 'Firm but developing softness',
          aroma: 'Mild and pleasant',
          uses: [
            'Cooking and curry preparations',
            'Chutneys and pickles',
            'Baking applications',
            'Raw mango salads'
          ],
          nutritionalValue: 'Good fiber content and developing sugars',
          shelfLife: '3-5 days to full ripeness',
          sugarContent: 'Medium (8-10%)',
          firmness: 'Firm with minimal give'
        },
        {
          stage: 'Overripe',
          confidence: 91,
          color: '#DC2626',
          bgColor: 'bg-red-50 border-red-200',
          textColor: 'text-red-800',
          icon: '🔴',
          description: 'Past prime for fresh eating but excellent for processing. Very sweet with soft texture.',
          characteristics: [
            'Dark spots and wrinkled skin',
            'Very soft, may be mushy',
            'Intense, fermented aroma',
            'Some discoloration present'
          ],
          texture: 'Very soft to mushy',
          aroma: 'Very strong, slightly fermented',
          uses: [
            'Smoothies and purees',
            'Mango ice cream and sorbets',
            'Jams and preserves',
            'Baked goods and desserts'
          ],
          nutritionalValue: 'Very high in sugars and antioxidants',
          shelfLife: '1 day fresh, freeze for processing',
          sugarContent: 'Very high (16-18%)',
          firmness: 'Very soft, handle carefully'
        }
      ];

      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <Layout>
      <div className="mango-ripeness-container">
        <div className="mango-max-width">
          {/* Header */}
          <div className="mango-header">
            <div className="mango-title-wrapper">
              <Grape className="icon-lg text-orange-600" />
              <h1 className="mango-title">Mango Ripeness Detection</h1>
            </div>
            <h2 className="mango-subtitle">King of Fruits at Perfect Timing</h2>
            <p className="mango-description">
              Evaluate mango maturity with precision for optimal harvesting and consumption. Our AI system analyzes 
              color, texture, and visual indicators to determine the perfect ripeness level for your mangoes, 
              ensuring you enjoy them at their peak flavor and nutritional value.
            </p>
            <div className="mango-info-box">
              <p className="mango-info-text">
                Mango ripeness is crucial for both taste and texture. Unlike many fruits, mangoes can be picked 
                slightly underripe and will continue to ripen, developing their characteristic sweetness and aroma.
              </p>
            </div>
          </div>

          {/* Ripeness Indicators */}
          <div className="indicators-section">
            <h3 className="indicators-title">Key Ripeness Indicators:</h3>
            <div className="indicators-grid">
              <div className="indicator-card">
                <div className="indicator-circle gradient-green-yellow"></div>
                <span className="indicator-label">Color Change</span>
              </div>
              <div className="indicator-card">
                <div className="indicator-circle gradient-orange-red"></div>
                <span className="indicator-label">Texture</span>
              </div>
              <div className="indicator-card">
                <div className="indicator-circle gradient-purple-pink"></div>
                <span className="indicator-label">Aroma</span>
              </div>
              <div className="indicator-card">
                <div className="indicator-circle gradient-blue-indigo"></div>
                <span className="indicator-label">Firmness</span>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="mango-upload-section">
            <p className="mango-upload-label">Upload an image of your mango:</p>
            <ImageUpload
              onImageSelect={handleImageSelect}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
          </div>

          {/* Analysis Results */}
          {analysisResult && (
            <div className="mango-analysis-results">
              <div className="mango-analysis-header">
                <CheckCircle className="icon-md text-green-600" />
                <h3 className="mango-analysis-title">Mango Analysis Complete</h3>
              </div>

              <div className="mango-analysis-grid">
                {/* Main Result */}
                <div className="mango-result-main">
                  <div className={`mango-stage-card ${analysisResult.bgColor}`}>
                    <div className="mango-stage-icon">{analysisResult.icon}</div>
                    <h4 className={`mango-stage-name ${analysisResult.textColor}`}>
                      {analysisResult.stage}
                    </h4>
                    <div className={`mango-confidence ${analysisResult.textColor}`}>
                      {analysisResult.confidence}%
                    </div>
                    <p className="mango-confidence-label">Accuracy</p>
                  </div>

                  <div className="mango-metrics">
                    <div className="mango-metric-item">
                      <div className="metric-label">Texture</div>
                      <div className="metric-value">{analysisResult.texture}</div>
                    </div>
                    <div className="mango-metric-item">
                      <div className="metric-label">Aroma</div>
                      <div className="metric-value">{analysisResult.aroma}</div>
                    </div>
                    <div className="mango-metric-item">
                      <div className="metric-label">Sugar Content</div>
                      <div className="metric-value">{analysisResult.sugarContent}</div>
                    </div>
                    <div className="mango-metric-item">
                      <div className="metric-label">Shelf Life</div>
                      <div className="metric-value">{analysisResult.shelfLife}</div>
                    </div>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="mango-result-details">
                  <div>
                    <p className={`mango-result-description ${analysisResult.textColor} ${analysisResult.bgColor}`}>
                      {analysisResult.description}
                    </p>
                  </div>

                  <div className="mango-detail-grid">
                    {/* Characteristics */}
                    <div className="mango-detail-card">
                      <h5 className="mango-detail-title">
                        <Clock className="mango-detail-icon" />
                        Physical Characteristics
                      </h5>
                      <div className="mango-detail-list">
                        {analysisResult.characteristics.map((char, index) => (
                          <div key={index} className="mango-detail-item">
                            <div className="mango-bullet mango-bullet-gray"></div>
                            {char}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Best Uses */}
                    <div className="mango-detail-card">
                      <h5 className="mango-detail-title">
                        <Star className="mango-detail-icon" />
                        Recommended Uses
                      </h5>
                      <div className="mango-detail-list">
                        {analysisResult.uses.map((use, index) => (
                          <div key={index} className="mango-detail-item">
                            <div className="mango-bullet" style={{ backgroundColor: analysisResult.color }}></div>
                            {use}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Nutritional Information */}
                  <div className={`mango-nutritional-box ${analysisResult.bgColor}`}>
                    <h5 className={`mango-nutritional-title ${analysisResult.textColor}`}>
                      <AlertTriangle className="mango-detail-icon" />
                      Nutritional Profile
                    </h5>
                    <p className="mango-nutritional-text">{analysisResult.nutritionalValue}</p>
                  </div>
                </div>
              </div>

              {/* Mango Tips */}
              <div className="mango-tips-section">
                <h5 className="mango-tips-title">🥭 Mango Mastery Tips</h5>
                <div className="mango-tips-grid">
                  <div>
                    <strong>Ripening:</strong> Store at room temperature, then refrigerate when ripe
                  </div>
                  <div>
                    <strong>Selection:</strong> Choose mangoes that yield slightly to gentle pressure
                  </div>
                  <div>
                    <strong>Varieties:</strong> Different mango varieties ripen to different colors
                  </div>
                  <div>
                    <strong>Cutting:</strong> Score the flesh in a grid pattern for easy serving
                  </div>
                  <div>
                    <strong>Storage:</strong> Ripe mangoes can be frozen for up to 6 months
                  </div>
                  <div>
                    <strong>Health:</strong> Rich in vitamins A, C, and over 20 different vitamins
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MangoRipeness;